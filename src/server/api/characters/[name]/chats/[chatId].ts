// src/server/api/characters/[name]/chats/[chatId].ts

import { defineEventHandler, readBody } from "h3";
import { promises as fs } from "fs";
import path from "path";
import { Mutex } from "async-mutex";

import {
  getChatsDir,
  getChatIndexFile,
  getChatIndex,
  saveChatIndex,
} from "../../../utils/chat";

const chatMutex = new Mutex();

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);
  const chatId = event.context.params.chatId;
  const method = event.node.req.method;

  const chatsDir = getChatsDir(name);
  const chatIndexFile = getChatIndexFile(name);
  const chatFile = path.join(chatsDir, `${chatId}.json`);

  if (method === "GET") {
    // Получить конкретный чат
    try {
      const data = await fs.readFile(chatFile, "utf-8");
      return JSON.parse(data);
    } catch {
      return { error: "Chat not found" };
    }
  }

  if (method === "PATCH") {
    // Обновить чат
    const body = await readBody(event);

    const result = await chatMutex.runExclusive(async () => {
      try {
        const chat = JSON.parse(await fs.readFile(chatFile, "utf-8"));
        Object.assign(chat, body);
        await fs.writeFile(chatFile, JSON.stringify(chat, null, 2));

        // Обновляем индекс чатов
        const index = await getChatIndex(chatIndexFile);
        if (index.chats[chatId]) {
          index.chats[chatId].updatedAt = Date.now();
          index.chats[chatId].currentState = chat.currentState;
          await saveChatIndex(chatIndexFile, index);
        }

        return chat;
      } catch (err) {
        console.error("Failed to update chat:", err);
        return { error: "Failed to update chat" };
      }
    });

    return result;
  }

  if (method === "DELETE") {
    // Удалить чат

    const result = await chatMutex.runExclusive(async () => {
      try {
        await fs.unlink(chatFile);

        // Обновляем индекс чатов
        const index = await getChatIndex(chatIndexFile);
        delete index.chats[chatId];
        await saveChatIndex(chatIndexFile, index);

        return { success: true };
      } catch (err) {
        console.error("Failed to delete chat:", err);
        return { error: "Failed to delete chat" };
      }
    });

    return result;
  }

  return { error: "Invalid request" };
});
