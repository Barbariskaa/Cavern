// server/api/admin/login.ts
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Простая проверка логина и пароля
  // В реальном приложении используйте безопасное хранение и сравнение паролей
  if (body.username === 'admin' && body.password === 'admin') {
    // В реальном приложении используйте JWT или сессии
    return { success: true }
  }

  setResponseStatus(event, 401)
  return { success: false, message: 'Invalid credentials' }
})
