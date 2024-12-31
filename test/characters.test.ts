import { promises as fs } from 'fs'
import path from 'path'
import { readPngMetadata, saveAvatar } from '../src/server/api/utils/chat'

// Создаём временную директорию для тестов
const TEST_DIR = path.join(__dirname, 'temp')

beforeAll(async () => {
  await fs.mkdir(TEST_DIR, { recursive: true })
})

afterAll(async () => {
  await fs.rm(TEST_DIR, { recursive: true, force: true })
})

describe('Character Management', () => {
  const testPngPath = path.join(__dirname, 'fixtures', 'test-character.png')

  test('should extract character data from PNG', async () => {
    const buffer = await fs.readFile(testPngPath)
    const metadata = await readPngMetadata(buffer)

    expect(metadata).toBeTruthy()
    expect(metadata.data).toHaveProperty('name')
    expect(metadata.data).toHaveProperty('description')
  })

  test('should save avatar and return correct path', async () => {
    const buffer = await fs.readFile(testPngPath)
    const avatarPath = await saveAvatar(buffer, TEST_DIR)

    expect(avatarPath).toMatch(/^\/characters\/cards\/.+\/avatar\.webp$/)

    // Проверяем, что файл реально создан
    const savedFile = path.join(TEST_DIR, 'avatar.webp')
    const stat = await fs.stat(savedFile)
    expect(stat.isFile()).toBe(true)
  })
})