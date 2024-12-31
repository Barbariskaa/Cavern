// server/api/admin/stats.ts
import { defineEventHandler } from 'h3'
import os from 'os'
import process from 'process'

export default defineEventHandler(async (event) => {
  // Получаем загрузку CPU
  function getCpuLoad() {
    const cpus = os.cpus()
    let totalIdle = 0
    let totalTick = 0

    cpus.forEach(cpu => {
      for (const type in cpu.times) {
        totalTick += cpu.times[type]
      }
      totalIdle += cpu.times.idle
    })

    return {
      idle: totalIdle / cpus.length,
      total: totalTick / cpus.length,
      cores: cpus.length
    }
  }

  // Получаем два замера с интервалом для вычисления загрузки
  const start = getCpuLoad()
  await new Promise(resolve => setTimeout(resolve, 100))
  const end = getCpuLoad()

  const idleDifference = end.idle - start.idle
  const totalDifference = end.total - start.total
  const cpuLoad = 100 - Math.floor(100 * idleDifference / totalDifference)
  // Получаем информацию о памяти процесса
  const processMemory = process.memoryUsage()

  const stats = {
    system: {
      platform: os.platform(),
      osUptime: os.uptime(),
      nodeVersion: process.version,
      // Добавляем время работы приложения
      appUptime: process.uptime()
    },
    memory: {
      total: os.totalmem(),
      free: os.freemem(),
      used: os.totalmem() - os.freemem(),
      // Добавляем память приложения
      process: {
        rss: processMemory.rss,        // Resident Set Size - общая память
        heapTotal: processMemory.heapTotal, // Выделенная память кучи
        heapUsed: processMemory.heapUsed,   // Использованная память кучи
        external: processMemory.external     // Память для C++ объектов
      }
    },
    cpu: {
      load: cpuLoad,
      cores: os.cpus().length
    }
  }

  return stats
})
