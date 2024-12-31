import { defineEventHandler } from 'h3'
import { promises as fs } from 'fs'
import path from 'path'

const PERSONAS_DIR = path.join(process.cwd(), 'personas')
const CONFIG_FILE = path.join(process.cwd(), 'config/cavern.json')

// Типы
interface Persona {
  id: string
  name: string
  description: string
  avatar: string
  position: string
  depthValue?: number
  depthRole?: string
  isDefault?: boolean
}

interface Config {
  currentPersona?: string
  personas: {
    [key: string]: Persona
  }
}

// Утилиты
async function ensureDirectories() {
  await fs.mkdir(PERSONAS_DIR, { recursive: true })
  await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true })
}

async function loadConfig(): Promise<Config> {
  try {
    const content = await fs.readFile(CONFIG_FILE, 'utf-8')
    return JSON.parse(content)
  } catch {
    return { personas: {} }
  }
}

async function saveConfig(config: Config) {
  await fs.writeFile(CONFIG_FILE, JSON.stringify(config, null, 2))
}

export default defineEventHandler(async (event) => {
  await ensureDirectories()

  // GET /api/persona/list - список всех персон
  if (event.method === 'GET' && event.path === '/api/persona/list') {
    const config = await loadConfig()
    return Object.values(config.personas)
  }

  // POST /api/persona/create - создание новой персоны
  if (event.method === 'POST' && event.path === '/api/persona/create') {
    const body = await readBody(event)
    const id = Date.now().toString()
    const persona: Persona = {
      id,
      name: body.name,
      description: body.description,
      avatar: body.avatar,
      position: '0'
    }

    const config = await loadConfig()
    config.personas[id] = persona
    await saveConfig(config)

    return persona
  }

  // DELETE /api/persona/:id - удаление персоны
  if (event.method === 'DELETE' && event.path.startsWith('/api/persona/')) {
    const id = event.path.split('/').pop()
    const config = await loadConfig()

    delete config.personas[id]
    if (config.currentPersona === id) {
      delete config.currentPersona
    }

    await saveConfig(config)
    return { success: true }
  }

  // PATCH /api/persona/:id - обновление персоны
  if (event.method === 'PATCH' && event.path.startsWith('/api/persona/')) {
    const id = event.path.split('/').pop()
    const body = await readBody(event)

    const config = await loadConfig()
    config.personas[id] = { ...config.personas[id], ...body }
    await saveConfig(config)

    return config.personas[id]
  }

  // POST /api/persona/import - импорт персон
  if (event.method === 'POST' && event.path === '/api/persona/import') {
    const formData = await readMultipartFormData(event)
    const file = formData.find(f => f.name === 'file')

    if (file) {
      const content = JSON.parse(file.data.toString())
      await saveConfig(content)
      return Object.values(content.personas)
    }
  }

  // GET /api/persona/export - экспорт персон
  if (event.method === 'GET' && event.path === '/api/persona/export') {
    const config = await loadConfig()

    setHeaders(event, {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename=personas-backup.json'
    })

    return config
  }
})
