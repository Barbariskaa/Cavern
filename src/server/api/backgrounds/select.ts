import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'data/config/app/background.ts')

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw new Error('Method not allowed')
  }

  try {
    const body = await readBody(event)
    
    // Формируем содержимое конфига
    const configContent = `// data/config/app/background.ts
export const backgroundConfig = {
  selectedBackground: '${body.selectedBackground}',
  lastModified: ${body.lastModified},
};`

    // Записываем конфиг
    await fs.writeFile(CONFIG_PATH, configContent, 'utf-8')

    return { success: true }
  } catch (err) {
    console.error('Error saving background config:', err)
    throw new Error('Failed to save background config')
  }
})