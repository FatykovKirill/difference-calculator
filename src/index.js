// import _ from 'lodash';

import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';

import parsing from './parsing.js';
import buildTree from './builtTree.js';
import formatter from './formatters/index.js';

const getPath = (file) => resolve(cwd(), file);
const getFormat = (file) => extname(file);

const gendiff = (obj1, obj2, format = 'stylish') => {
  const readFileObj1 = readFileSync(getPath(obj1), 'utf-8');
  const readFileObj2 = readFileSync(getPath(obj2), 'utf-8');
  const parseObj1 = parsing(readFileObj1, getFormat(obj1));
  const parseObj2 = parsing(readFileObj2, getFormat(obj2));

  const tree = buildTree(parseObj1, parseObj2);
  return formatter(tree, format);
  // return JSON.stringify(tree);
};

export default gendiff;
