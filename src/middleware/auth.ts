// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    // Проверяем только страницу админки
    if (to.path === '/admin') {
      // В реальном приложении тут должна быть проверка JWT или сессии
      // Сейчас просто пропускаем, т.к. у нас проверка на уровне компонента
      return
    }
  })
  