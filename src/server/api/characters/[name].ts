   // src/server/api/characters/[name].ts

   import { defineEventHandler } from 'h3'
   import { promises as fs } from 'fs'
   import path from 'path'
   import { Mutex } from 'async-mutex'
   import { getCharacterDir, CARDS_DIR, INDEX_FILE, getIndex, saveIndex } from '../utils/chat'

   // Создаём мьютекс
   const indexMutex = new Mutex()

   export default defineEventHandler(async (event) => {
     const { req, context } = event
     const method = req.method
     const name = decodeURIComponent(context.params.name)

     if (method === 'DELETE') {
       const result = await indexMutex.runExclusive(async () => {
         try {
           const index = await getIndex()
           const char = index.characters[name]

           if (!char) throw new Error('Character not found')

           // Удаляем всю директорию персонажа
           const charDir = path.join(CARDS_DIR, char.directory)
           await fs.rm(charDir, { recursive: true, force: true })

           // Удаляем из индекса
           delete index.characters[name]
           await saveIndex(index)

           return { success: true }
         } catch (error) {
           console.error('Error deleting character:', error)
           return { success: false, error: error.message }
         }
       })

       return result
     }

     // Обработчик GET для получения полного персонажа
     if (method === 'GET' && context.params.name && context.params.action === 'full') {
       const characterName = decodeURIComponent(context.params.name)
       const charDir = getCharacterDir(characterName)
       const cardPath = path.join(charDir, 'card.json')

       try {
         const data = await fs.readFile(cardPath, 'utf-8')
         const charData = JSON.parse(data)
         return charData
       } catch {
         return { error: 'Character not found' }
       }
     }

     return { error: 'Invalid request' }
   })
