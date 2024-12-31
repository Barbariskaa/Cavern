// src/server/api/presets/[presetName].ts
import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const { presetName } = event.context.params

  const presetsDir = path.resolve('./data/presets/')
  const presetPath = path.join(presetsDir, `${presetName}.json`)

  if (fs.existsSync(presetPath)) {
    const presetContent = fs.readFileSync(presetPath, 'utf-8')
    const presetData = JSON.parse(presetContent)
    return presetData
  } else {
    event.res.statusCode = 404
    return { error: 'Preset not found' }
  }
})