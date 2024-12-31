import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const BACKGROUNDS_DIR = path.join(process.cwd(), 'public/backgrounds')
const THUMBNAILS_DIR = path.join(process.cwd(), 'public/backgrounds/thumbnails')

// Создаем директории если их нет
async function ensureDirectories() {
  await fs.mkdir(BACKGROUNDS_DIR, { recursive: true })
  await fs.mkdir(THUMBNAILS_DIR, { recursive: true })
}

export default defineEventHandler(async (event) => {
  await ensureDirectories()

  // GET - получение списка фонов
  if (event.method === 'GET') {
    try {
      const files = await fs.readdir(BACKGROUNDS_DIR)
      const backgrounds = files
        .filter(f => !f.startsWith('.') && f !== 'thumbnails')
        .map(file => ({
          id: file,
          name: path.parse(file).name,
          url: `/backgrounds/${file}`,
          thumbnail: `/backgrounds/thumbnails/${file}`,
          locked: false
        }))
      return backgrounds
    } catch (err) {
      console.error('Error reading backgrounds:', err)
      return []
    }
  }

  // POST - загрузка нового фона
  if (event.method === 'POST') {
    const formData = await readMultipartFormData(event)
    const file = formData?.find(f => f.name === 'background')
    if (!file) throw new Error('No file uploaded')

    const filename = `${Date.now()}-${file.filename}`
    const filepath = path.join(BACKGROUNDS_DIR, filename)
    const thumbnailPath = path.join(THUMBNAILS_DIR, filename)

    try {
      // Сохраняем оригинал
      await fs.writeFile(filepath, file.data)

      // Создаем thumbnail
      await sharp(file.data)
        .resize(400, 225, { fit: 'cover' })
        .toFile(thumbnailPath)

      return {
        id: filename,
        name: path.parse(filename).name,
        url: `/backgrounds/${filename}`,
        thumbnail: `/backgrounds/thumbnails/${filename}`,
        locked: false
      }
    } catch (err) {
      console.error('Error saving background:', err)
      throw new Error('Failed to save background')
    }
  }

  // DELETE - удаление фона
  if (event.method === 'DELETE') {
    const id = event.path.split('/').pop()
    if (!id) throw new Error('No background ID provided')

    try {
      await fs.unlink(path.join(BACKGROUNDS_DIR, id))
      await fs.unlink(path.join(THUMBNAILS_DIR, id))
      return { success: true }
    } catch (err) {
      console.error('Error deleting background:', err)
      throw new Error('Failed to delete background')
    }
  }

  // PATCH - обновление информации о фоне
  if (event.method === 'PATCH') {
    const id = event.path.split('/').pop()
    if (!id) throw new Error('No background ID provided')

    const body = await readBody(event)
    const oldPath = path.join(BACKGROUNDS_DIR, id)
    const newPath = path.join(BACKGROUNDS_DIR, `${body.name}${path.extname(id)}`)

    try {
      await fs.rename(oldPath, newPath)
      return { success: true }
    } catch (err) {
      console.error('Error updating background:', err)
      throw new Error('Failed to update background')
    }
  }
})
