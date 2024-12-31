// src/utils/openai.ts

import axios from "axios";

export async function testOpenAIConnection(
  apiKey: string,
  proxyUrl: string,
): Promise<boolean> {
  try {
    const baseUrl = proxyUrl || "https://api.openai.com/v1";
    const apiUrl = `${baseUrl}/models`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    // Если запрос успешен, вернем true
    return true;
  } catch (error) {
    console.error("OpenAI connection error:", error);
    return false;
  }
}
