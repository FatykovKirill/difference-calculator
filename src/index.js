import _ from 'lodash';

import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { cwd } from 'node:process';

import parsing from './parsing.js';
import stylish from './stylish.js';

const getPath = (file) => resolve(cwd(), file);
const getFormat = (file) => extname(file);

const gendiff = (obj1, obj2) => {
  const readFileObj1 = readFileSync(getPath(obj1), 'utf-8');
  const readFileObj2 = readFileSync(getPath(obj2), 'utf-8');
  const parseObj1 = parsing(readFileObj1, getFormat(obj1));
  const parseObj2 = parsing(readFileObj2, getFormat(obj2));

  const iter = (file1, file2) => {
    const keys = _.union(_.keys(file1), _.keys(file2));
    const sortedKeys = _.sortBy(keys);
    const result = sortedKeys.map((key) => {
      if (!_.has(file1, key)) {
        return {
          key,
          type: 'added',
          value: file2[key],
        };
      }
      if (!_.has(file2, key)) {
        return {
          key,
          type: 'deleted',
          value: file1[key],
        };
      }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return {
          key,
          type: 'nested',
          children: iter(file1[key], file2[key]),
        };
      }
      if (file1[key] !== file2[key]) {
        return {
          key,
          type: 'changed',
          oldValue: file1[key],
          newValue: file2[key],
        };
      }
      return {
        key,
        type: 'unchanged',
        value: file1[key],
      };
    });
    return result;
  };
  // return JSON.stringify(iter(parseObj1, parseObj2));
  return stylish(iter(parseObj1, parseObj2));
};

export default gendiff;
