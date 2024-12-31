// src/server/api/characters/[name]/full.ts

import { defineEventHandler } from "h3";
import { promises as fs } from "fs";
import path from "path";
import { getCharacterDir, CARD_FILENAME } from "../../utils/chat";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params?.name || "");

  const characterDir = getCharacterDir(name);
  const cardPath = path.join(characterDir, CARD_FILENAME);

  try {
    const cardData = await fs.readFile(cardPath, "utf-8");
    return JSON.parse(cardData);
  } catch (err) {
    console.error("Ошибка при чтении персонажа:", err);
    return { error: "Персонаж не найден" };
  }
});
