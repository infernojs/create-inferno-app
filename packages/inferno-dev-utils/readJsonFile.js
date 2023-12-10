import { readFileSync } from 'fs';
import { resolve } from 'path';

export function readJsonFile(filePath) {
  return JSON.parse(readFileSync(resolve(filePath)));
}
