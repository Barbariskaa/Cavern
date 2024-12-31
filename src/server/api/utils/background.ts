import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

const configPath = resolve('./data/config/app/background.ts')

export async function setBackgroundConfig(backgroundId: string) {
  const config = `export default { selectedBackgroundId: '${backgroundId}' }`
  await writeFile(configPath, config, 'utf-8')
}

export async function getBackgroundConfig() {
  try {
    const config = await readFile(configPath, 'utf-8')
    const { selectedBackgroundId } = await import(configPath)
    return selectedBackgroundId
  } catch (err) {
    console.error('Error reading background config:', err)
    return null
  }
}