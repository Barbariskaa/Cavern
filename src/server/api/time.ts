// server/api/time.ts

import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return { timestamp: Date.now() }
})
