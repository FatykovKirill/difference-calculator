import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const file1 = getFixturePath('filepath1.json');
  const file2 = getFixturePath('filepath2.json');
  const result = readFile('result.txt');

  expect(gendiff(file1, file2)).toBe(result);
});

test('yaml', () => {
  const file1 = getFixturePath('filepath1.yml');
  const file2 = getFixturePath('filepath2.yml');
  const result = readFile('result.txt');

  expect(gendiff(file1, file2)).toBe(result);
});
