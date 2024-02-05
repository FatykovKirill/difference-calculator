import fs from 'node:fs';
import path from 'node:path';

import parsing from './parsing.js';
import buildTree from './builtTree.js';
import formatter from './formatters/index.js';

const getFormat = (file) => path.extname(file);

const readFile = (file) => {
  const fullPath = path.resolve(process.cwd(), file);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

const gendiff = (obj1, obj2, format = 'stylish') => {
  const parseObj1 = parsing(readFile(obj1), getFormat(obj1));
  const parseObj2 = parsing(readFile(obj2), getFormat(obj2));

  const tree = buildTree(parseObj1, parseObj2);
  return formatter(tree, format);
};

export default gendiff;
