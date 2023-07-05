import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const gendiff = (obj1, obj2) => {
  const currentDir = cwd();
  const pathObj1 = resolve(currentDir, obj1);
  const pathObj2 = resolve(currentDir, obj2);
  const readFileObj1 = readFileSync(pathObj1, 'utf-8');
  const readFileObj2 = readFileSync(pathObj2, 'utf-8');
  const parseObj1 = JSON.parse(readFileObj1);
  const parseObj2 = JSON.parse(readFileObj2);

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
