// src/server/api/characters/[name]/chats/index.ts

import { defineEventHandler, readBody } from "h3";
import { promises as fs } from "fs";
import path from "path";
import { Mutex } from "async-mutex";

import {
  getChatsDir,
  getChatIndexFile,
  ensureCharacterChatsDir,
  getCharacterDir,
  getChatIndex,
  saveChatIndex,
} from "../../../utils/chat";

const chatMutex = new Mutex();

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);
  const method = event.node.req.method;

  const characterDir = getCharacterDir(name);
  try {
    await fs.access(characterDir);
  } catch {
    return { error: "Character not found" };
  }

  const chatsDir = getChatsDir(name);
  const chatIndexFile = getChatIndexFile(name);

  await ensureCharacterChatsDir(name);

  if (method === "GET") {
    // Возвращаем список чатов персонажа
    const index = await getChatIndex(chatIndexFile);
    const chats = Object.values(index.chats);
    return chats;
  }

  if (method === "POST") {
    // Создаем новый чат
    const body = await readBody(event);
    const newChatId = `chat_${Date.now()}`;
    const chat = {
      id: newChatId,
      characterId: name,
      messages: {},
      branches: {
        branch_1: {
          id: "branch_1",
          rootMessageId: null,
          parentBranchId: null,
          splitMessageId: null,
        },
      },
      currentState: {
        branchId: "branch_1",
        timestamp: Date.now(),
      },
    };

    // Добавляем первое сообщение из карточки персонажа
    if (body.firstMessage) {
      const msgId = "msg_1";
      chat.messages[msgId] = {
        id: msgId,
        content: body.firstMessage,
        role: "assistant",
        timestamp: Date.now(),
        parentId: null,
        branches: { branch_1: null },
      };
      chat.branches.branch_1.rootMessageId = msgId;
    }

    const chatFile = path.join(chatsDir, `${newChatId}.json`);
    await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

    // Обновляем индекс чатов
    await chatMutex.runExclusive(async () => {
      const index = await getChatIndex(chatIndexFile);
      index.chats[newChatId] = {
        id: newChatId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        currentState: chat.currentState,
      };
      await saveChatIndex(chatIndexFile, index);
    });

    return chat;
  }

  return { error: "Invalid request" };
});
