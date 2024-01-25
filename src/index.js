import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';
import parsing from './parsing.js';

const getPath = (file) => resolve(cwd(), file);
const getFormat = (file) => extname(file);

const gendiff = (obj1, obj2) => {
  const readFileObj1 = readFileSync(getPath(obj1), 'utf-8');
  const readFileObj2 = readFileSync(getPath(obj2), 'utf-8');
  const parseObj1 = parsing(readFileObj1, getFormat(obj1));
  const parseObj2 = parsing(readFileObj2, getFormat(obj2));

  const keys = _.union(_.keys(parseObj1), _.keys(parseObj2));
  const sortedKeys = _.sortBy(keys);
  const indent = '  ';
  const lines = sortedKeys.map((key) => {
    if (!Object.hasOwn(parseObj1, key)) {
      return `${indent}+ ${key}: ${parseObj2[key]}`;
    }
    if (!Object.hasOwn(parseObj2, key)) {
      return `${indent}- ${key}: ${parseObj1[key]}`;
    }
    if (parseObj1[key] !== parseObj2[key]) {
      return `${indent}- ${key}: ${parseObj1[key]}\n${indent}+ ${key}: ${parseObj2[key]}`;
    }
    return `${indent}  ${key}: ${parseObj2[key]}`;
  });
  const result = ['{',
    ...lines,
    '}'].join('\n');
  return result;
};

export default gendiff;
