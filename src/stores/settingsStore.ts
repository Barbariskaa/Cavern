// src/stores/settingsStore.ts
import { defineStore } from 'pinia'

interface Prompt {
  id: string
  name: string
  content: string
  enabled: boolean
  tokens?: number
  type?: string
  [key: string]: any
}

interface ModelSettings {
  temperature: number
  frequency_penalty: number
  presence_penalty: number
  top_p: number
  top_k: number
  repetition_penalty: number
  contextSize: number
  responseTokens: number
  unlimitedContext: boolean
  seed: number
  streamingText: boolean
  // Добавь другие настройки по необходимости
}

interface SettingsState {
  modelSettings: ModelSettings
  prompts: Prompt[]
}

export const useSettingsStore = defineStore('settingsStore', {
  state: (): SettingsState => ({
    modelSettings: {
      temperature: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      top_p: 1.0,
      top_k: 0,
      repetition_penalty: 1.0,
      contextSize: 2048,
      responseTokens: 50,
      unlimitedContext: false,
      seed: -1,
      streamingText: true,
    },
    prompts: [],
  }),
  actions: {
    setModelSettings(settings: Partial<ModelSettings>) {
      this.modelSettings = { ...this.modelSettings, ...settings }
    },
    setPrompts(prompts: Prompt[]) {
      this.prompts = prompts
    },
    updatePrompt(prompt: Prompt) {
      const index = this.prompts.findIndex(p => p.id === prompt.id)
      if (index !== -1) {
        this.prompts.splice(index, 1, prompt)
      }
    },
    // Добавь другие действия по необходимости
  },
})