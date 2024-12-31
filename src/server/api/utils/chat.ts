// src/server/api/utils/chat.ts

import { promises as fs } from "fs";
import path from "path";
import extractChunks from "png-chunks-extract";
import parseText from "png-chunk-text";
import { ExifTool } from "exiftool-vendored";
import os from "os";
import sharp from "sharp";

const exiftool = new ExifTool();

// Константы для директорий и имен файлов
export const DATA_DIR = path.join(process.cwd(), "data");
export const CONFIG_DIR = path.join(DATA_DIR, "config");
export const CHARACTERS_DIR_NAME = "characters";
export const CHARACTERS_DIR = path.join(DATA_DIR, CHARACTERS_DIR_NAME);
export const CARDS_DIR = path.join(CHARACTERS_DIR, "cards");
export const CHAT_INDEX_FILENAME = "chats_index.json";
export const CHATS_DIR_NAME = "Chats";
export const INDEX_FILENAME = "characters_index.json";
export const CARD_FILENAME = "card.json";
export const AVATAR_FILENAME = "avatar.webp";

// Функция для получения директории персонажа
export function getCharacterDir(characterId: string) {
  return path.join(CARDS_DIR, characterId);
}

// Функция для получения директории чатов персонажа
export function getChatsDir(characterId: string) {
  return path.join(getCharacterDir(characterId), CHATS_DIR_NAME);
}

// Функция для получения пути к индексу чатов персонажа
export function getChatIndexFile(characterId: string) {
  return path.join(getCharacterDir(characterId), CHAT_INDEX_FILENAME);
}

// Функция для создания директорий, если их нет
export async function ensureCharacterChatsDir(characterId: string) {
  const chatsDir = getChatsDir(characterId);
  await fs.mkdir(chatsDir, { recursive: true });
}

// Функция для получения индекса чатов
export async function getChatIndex(
  chatIndexFile: string,
): Promise<{ chats: any }> {
  try {
    const data = await fs.readFile(chatIndexFile, "utf-8");
    return JSON.parse(data);
  } catch {
    return { chats: {} };
  }
}

// Функция для сохранения индекса чатов
export async function saveChatIndex(
  chatIndexFile: string,
  index: { chats: any },
) {
  await fs.writeFile(chatIndexFile, JSON.stringify(index, null, 2));
}

// Функция для создания необходимых директорий
export async function ensureDirectories() {
  await fs.mkdir(CONFIG_DIR, { recursive: true });
  await fs.mkdir(CHARACTERS_DIR, { recursive: true });
  await fs.mkdir(CARDS_DIR, { recursive: true });
}

// Функция для получения индекса персонажей
export async function getIndex(): Promise<any> {
  try {
    const data = await fs.readFile(INDEX_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { characters: {} };
  }
}

export const INDEX_FILE = path.join(CHARACTERS_DIR, INDEX_FILENAME);

// Функция для сохранения индекса персонажей
export async function saveIndex(index: any) {
  await fs.writeFile(INDEX_FILE, JSON.stringify(index, null, 2));
}

// Функция для генерации уникального идентификатора персонажа
export function generateUniqueId(displayName: string, index: any): string {
  let baseId = displayName.substring(0, 50).trim();
  let counter = 1;
  let finalId = baseId;

  while (index.characters[finalId]) {
    finalId = `${baseId} (${counter})`;
    counter++;
  }

  return finalId;
}

// Функция для чтения метаданных из PNG
export async function readPngMetadata(buffer: Buffer) {
  try {
    const chunks = extractChunks(buffer);

    const textChunks = chunks.filter((chunk) => chunk.name === "tEXt");

    for (const chunk of textChunks) {
      const textData = parseText.decode(chunk.data);

      if (textData.keyword === "chara") {
        const bufferObj = Buffer.from(textData.text, "base64");
        const jsonString = bufferObj.toString("utf8");
        let charData = JSON.parse(jsonString);

        return charData;
      }
    }

    return null;
  } catch (error) {
    console.error("Ошибка при чтении метаданных PNG:", error);
    return null;
  }
}

// Функция для чтения метаданных из AVIF
export async function readAvifMetadata(buffer: Buffer) {
  try {
    const tempFilePath = path.join(os.tmpdir(), `upload-${Date.now()}.avif`);
    await fs.writeFile(tempFilePath, buffer);

    const tags = await exiftool.read(tempFilePath);

    await fs.unlink(tempFilePath);

    if (tags && tags.UserComment) {
      const jsonString = tags.UserComment;
      let charData = JSON.parse(jsonString);

      return charData;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при чтении метаданных AVIF:", error);
    return null;
  } finally {
    await exiftool.end();
  }
}

// Функция для получения отображаемого имени персонажа
export function getCharacterDisplayName(char: any): string {
  if (char.data && char.data.name) {
    return char.data.name;
  }
  if (char.name) {
    return char.name;
  }
  return "Unknown Character";
}

// Функция для сохранения аватарки
export async function saveAvatar(
  buffer: Buffer,
  charDir: string,
  type: string,
): Promise<string> {
  let filepath: string;

  if (type === "image/avif") {
    filepath = path.join(charDir, "avatar.avif");

    // Сохраняем AVIF без изменений
    await fs.writeFile(filepath, buffer);
  } else {
    filepath = path.join(charDir, AVATAR_FILENAME);

    // Оптимизируем изображение и сохраняем в WebP
    await sharp(buffer)
      .resize(256, 256, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 80, effort: 1, smartSubsample: true })
      .toFile(filepath);
  }

  // Возвращаем относительный путь к аватарке
  return `/characters/cards/${path.basename(charDir)}/${path.basename(filepath)}`;
}

// Функция для создания директории персонажа
export async function createCharacterDirectory(characterId: string) {
  const charDir = getCharacterDir(characterId);
  await fs.mkdir(charDir, { recursive: true });
  return charDir;
}
