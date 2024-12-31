// src/utils/tokenizers.ts

import { Tiktoken } from 'js-tiktoken';
import { getEncoding } from 'js-tiktoken';
import claudeBpe from '@/encoders/claude.json'; // Путь к твоему claude.json

export function getTokenCount(content: string, tokenizer: string): number {
  if (tokenizer === 'o200k_base') {
    // Используем кодировку o200k_base
    const encoding = getEncoding('o200k_base');
    const tokens = encoding.encode(content);
    const count = tokens.length;
    encoding.free(); // Не забываем освободить ресурсы
    return count;
  } else if (tokenizer === 'Claude1/2') {
    // Используем js-tiktoken с claude.json
    const claudeEncoding = new Tiktoken(
      claudeBpe.bpe_ranks,
      claudeBpe.special_tokens,
      claudeBpe.pat_str
    );
    const tokens = claudeEncoding.encode(content);
    const count = tokens.length;
    claudeEncoding.free(); // Освобождаем ресурсы
    return count;
  } else {
    return 0; // Неизвестный токенайзер
  }
}