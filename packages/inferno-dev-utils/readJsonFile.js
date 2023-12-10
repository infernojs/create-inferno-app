import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as json5 from 'json5';

// JSON 5
export function readJsonFile(filePath) {
  return json5.parse(readFileSync(resolve(filePath), 'utf8'));
}
