import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const filejson1 = getFixturePath('filepath1.json');
const filejson2 = getFixturePath('filepath2.json');
const fileyml1 = getFixturePath('filepath1.yml');
const fileyml2 = getFixturePath('filepath2.yml');

test('stylish', () => {
  const result = readFile('resultStylish.txt');

  expect(gendiff(fileyml1, fileyml2)).toBe(result);
  expect(gendiff(filejson1, filejson2)).toBe(result);
});

test('plain', () => {
  const result = readFile('resultPlain.txt');

  expect(gendiff(fileyml1, fileyml2, 'plain')).toBe(result);
  expect(gendiff(filejson1, filejson2, 'plain')).toBe(result);
});
