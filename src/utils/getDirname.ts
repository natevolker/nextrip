import { dirname } from 'path'
import { fileURLToPath } from 'url'

export const getDirname = (importMetaUrl: string) => dirname(fileURLToPath(importMetaUrl))