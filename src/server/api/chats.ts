// src/server/api/chats.ts

import { defineEventHandler, readBody } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'
import { Mutex } from 'async-mutex'

import {
  getChatsDir,
  getChatIndexFile,
  ensureCharacterChatsDir,
  getCharacterDir,
  getChatIndex,
  saveChatIndex,
} from './utils/chat'

const chatMutex = new Mutex()

export default defineEventHandler(async (event) => {
  const { req } = event
  const url = req.url || ''
  const segments = url.split('/').filter(Boolean)
  const method = req.method

  if (segments[1] === 'characters' && segments[2] && segments[3] === 'chats') {
    const characterName = decodeURIComponent(segments[2])
    const chatId = segments[4]  // Может быть undefined

    // Проверяем, существует ли персонаж
    const characterDir = getCharacterDir(characterName)
    try {
      await fs.access(characterDir)
    } catch {
      return { error: 'Character not found' }
    }

    const chatsDir = getChatsDir(characterName)
    const chatIndexFile = getChatIndexFile(characterName)

    await ensureCharacterChatsDir(characterName)

    // Обработка запросов к чатам
    if (method === 'GET' && !chatId) {
      // Получить список чатов персонажа
      const index = await getChatIndex(chatIndexFile)
      const chats = Object.values(index.chats)
      return chats
    }

    if (method === 'GET' && chatId) {
      // Получить конкретный чат
      const chatFile = path.join(chatsDir, `${chatId}.json`)
      try {
        const data = await fs.readFile(chatFile, 'utf-8')
        return JSON.parse(data)
      } catch {
        return { error: 'Chat not found' }
      }
    }

    if (method === 'POST') {
      // Создать новый чат
      const body = await readBody(event)
      const newChatId = `chat_${Date.now()}`
      const chat = {
        id: newChatId,
        characterId: characterName,
        messages: {},
        branches: {
          branch_1: {
            id: 'branch_1',
            rootMessageId: null,
            parentBranchId: null,
            splitMessageId: null,
          },
        },
        currentState: {
          branchId: 'branch_1',
          timestamp: Date.now(),
        },
      }

      // Добавляем первое сообщение из карточки персонажа
      if (body.firstMessage) {
        const msgId = 'msg_1'
        chat.messages[msgId] = {
          id: msgId,
          content: body.firstMessage,
          role: 'assistant',
          timestamp: Date.now(),
          parentId: null,
          branches: { branch_1: null },
        }
        chat.branches.branch_1.rootMessageId = msgId
      }

      const chatFile = path.join(chatsDir, `${newChatId}.json`)
      await fs.writeFile(chatFile, JSON.stringify(chat, null, 2))

      // Обновляем индекс чатов
      await chatMutex.runExclusive(async () => {
        const index = await getChatIndex(chatIndexFile)
        index.chats[newChatId] = {
          id: newChatId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          currentState: chat.currentState,
        }
        await saveChatIndex(chatIndexFile, index)
      })

      return chat
    }

    if (method === 'PATCH' && chatId) {
      // Обновить чат
      const chatFile = path.join(chatsDir, `${chatId}.json`)
      const body = await readBody(event)

      const result = await chatMutex.runExclusive(async () => {
        try {
          const chat = JSON.parse(await fs.readFile(chatFile, 'utf-8'))
          Object.assign(chat, body)
          await fs.writeFile(chatFile, JSON.stringify(chat, null, 2))

          // Обновляем индекс чатов
          const index = await getChatIndex(chatIndexFile)
          if (index.chats[chatId]) {
            index.chats[chatId].updatedAt = Date.now()
            index.chats[chatId].currentState = chat.currentState
            await saveChatIndex(chatIndexFile, index)
          }

          return chat
        } catch (err) {
          console.error('Failed to update chat:', err)
          return { error: 'Failed to update chat' }
        }
      })

      return result
    }

    if (method === 'DELETE' && chatId) {
      // Удалить чат
      const chatFile = path.join(chatsDir, `${chatId}.json`)

      const result = await chatMutex.runExclusive(async () => {
        try {
          await fs.unlink(chatFile)

          // Обновляем индекс чатов
          const index = await getChatIndex(chatIndexFile)
          delete index.chats[chatId]
          await saveChatIndex(chatIndexFile, index)

          return { success: true }
        } catch (err) {
          console.error('Failed to delete chat:', err)
          return { error: 'Failed to delete chat' }
        }
      })

      return result
    }
  }

  return { error: 'Invalid request' }
})
