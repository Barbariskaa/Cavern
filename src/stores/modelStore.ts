// src/stores/modelStore.ts
import { defineStore } from 'pinia'

interface ModelState {
  apiType: string
  apiSource: string
  modelName: string
}

export const useModelStore = defineStore('modelStore', {
  state: (): ModelState => ({
    apiType: 'chat-completion',     // Тип API по умолчанию
    apiSource: 'openai',            // Источник API по умолчанию
    modelName: 'gpt-3.5-turbo',     // Модель по умолчанию
  }),
  actions: {
    setApiType(type: string) {
      this.apiType = type
    },
    setApiSource(source: string) {
      this.apiSource = source
    },
    setModelName(name: string) {
      this.modelName = name
    },
  },
})