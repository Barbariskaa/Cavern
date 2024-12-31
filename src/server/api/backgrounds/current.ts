import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'data/config/app/background.ts')
const BACKGROUNDS_DIR = path.join(process.cwd(), 'public/backgrounds')

export default defineEventHandler(async () => {
  try {
    // Читаем конфиг как текст
    const configText = await fs.readFile(CONFIG_PATH, 'utf-8')
    
    // Извлекаем ID фона из конфига через регулярку
    const match = configText.match(/selectedBackground: '(.+?)'/)
    if (!match) return { background: null }
    
    const backgroundId = match[1]
    if (!backgroundId) return { background: null }

    // Возвращаем информацию о фоне
    return {
      background: {
        id: backgroundId,
        url: `/backgrounds/${backgroundId}`,
        thumbnail: `/backgrounds/thumbnails/${backgroundId}`
      }
    }
  } catch (err) {
    console.error('Error reading background config:', err)
    return { background: null }
  }
})