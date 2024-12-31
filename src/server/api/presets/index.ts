// src/server/api/presets/index.ts
import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const presetsDir = path.resolve('./data/presets/')

  // Проверяем, существует ли директория
  if (!fs.existsSync(presetsDir)) {
    return []
  }

  // Читаем список файлов в директории пресетов
  const files = fs.readdirSync(presetsDir)

  // Фильтруем файлы с расширением .json
  const presets = files.filter(file => file.endsWith('.json')).map(file => {
    return {
      name: path.basename(file, '.json'),
      filename: file,
    }
  })

  return presets
})