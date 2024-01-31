import _ from 'lodash';

const buildTree = (file1, file2) => {
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
        type: 'removed',
        value: file1[key],
      };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        key,
        type: 'nested',
        children: buildTree(file1[key], file2[key]),
      };
    }
    if (file1[key] !== file2[key]) {
      return {
        key,
        type: 'updated',
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

export default buildTree;
