// src/server/api/characters/index.ts

import { defineEventHandler, readMultipartFormData } from "h3";
import { promises as fs } from "fs";
import path from "path";
import { Mutex } from "async-mutex";

import {
  getCharacterDir,
  CARD_FILENAME,
  getIndex,
  saveIndex,
  createCharacterDirectory,
  getCharacterDisplayName,
  readPngMetadata,
  readAvifMetadata,
  generateUniqueId,
  ensureDirectories,
  saveAvatar,
} from "~/server/api/utils/chat";

// Создаем мьютекс для предотвращения состояния гонки при обновлении индекса
const indexMutex = new Mutex();

export default defineEventHandler(async (event) => {
  await ensureDirectories();

  const method = event.req.method;

  if (method === "GET") {
    try {
      const index = await getIndex();
      const characters = Object.values(index.characters).map((char: any) => {
        return {
          id: char.id,
          displayName: char.displayName,
          avatarPath: char.avatarPath,
          // добавьте cardPath, если нужно возвращать его и в списке
          // cardPath: char.cardPath
        };
      });
      return characters;
    } catch (error) {
      console.error("Ошибка при чтении персонажей:", error);
      return [];
    }
  } else if (method === "POST") {
    const result = await indexMutex.runExclusive(async () => {
      try {
        const formData = await readMultipartFormData(event);
        if (!formData) throw new Error("Не получены данные формы");

        const file = formData.find((item) => item.name === "file");
        const type = formData
          .find((item) => item.name === "type")
          ?.data?.toString();

        if (!file) throw new Error("Не получен файл");

        let charData;
        let avatarPath;

        if (type === "image/png") {
          charData = await readPngMetadata(file.data);
          if (!charData) {
            throw new Error("Не удалось прочитать данные персонажа из PNG");
          }
        } else if (type === "image/avif") {
          charData = await readAvifMetadata(file.data);
          if (!charData) {
            throw new Error("Не удалось прочитать данные персонажа из AVIF");
          }
        } else {
          charData = JSON.parse(file.data.toString());
        }

        if (!charData) throw new Error("Не удалось разобрать данные персонажа");

        const displayName = getCharacterDisplayName(charData);
        const index = await getIndex();
        const uniqueId = generateUniqueId(displayName, index);

        // Обновляем данные персонажа
        if (charData.data) {
          charData.data.id = uniqueId;
        } else {
          charData.id = uniqueId;
        }

        // Создаем директорию для персонажа
        const charDir = await createCharacterDirectory(uniqueId);

        // Сохраняем аватар
        avatarPath = await saveAvatar(file.data, charDir, file.type);

        // Путь к файлу card.json
        const cardPath = path.join(charDir, CARD_FILENAME);
        // Относительный путь для хранения в индексе
        const cardPathRelative = `/characters/cards/${uniqueId}/${CARD_FILENAME}`;

        // Обновляем индекс персонажей
        index.characters[uniqueId] = {
          id: uniqueId,
          displayName,
          avatarPath,
          cardPath: cardPathRelative, // <-- ВАЖНО: добавляем путь к карточке
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        // Сохраняем индекс
        await saveIndex(index);

        // Сохраняем данные персонажа в card.json
        await fs.writeFile(cardPath, JSON.stringify(charData, null, 2));

        return {
          success: true,
          character: {
            id: uniqueId,
            displayName,
            avatarPath,
            cardPath: cardPathRelative,
          },
        };
      } catch (error: any) {
        console.error("Ошибка при сохранении персонажа:", error);
        return { success: false, error: error.message };
      }
    });

    return result;
  } else {
    return { error: "Недопустимый метод запроса" };
  }
});
