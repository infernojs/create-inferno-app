import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'json5';

// JSON 5
export function readJsonFile(filePath) {
  return parse(readFileSync(resolve(filePath), 'utf8'));
}
