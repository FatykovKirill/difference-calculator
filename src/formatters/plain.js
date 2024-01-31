import _ from 'lodash';

const stringify = (item) => {
  if (_.isObject(item)) {
    return '[complex value]';
  }
  return _.isString(item) ? `'${item}'` : item;
};
const getPath = (paths) => paths.flat().join('.');

const plain = (tree) => {
  const iter = (value, path = []) => {
    const result = value.flatMap((node) => {
      const currentKey = getPath([path, node.key]);
      switch (node.type) {
        case 'added':
          return `Property '${currentKey}' was ${node.type} with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${currentKey}' was ${node.type}`;
        case 'updated':
          return `Property '${currentKey}' was ${node.type}. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
        case 'nested':
          return iter(node.children, currentKey);
        case 'unchanged':
          return [];
        default:
          throw new Error('Uncorrect data');
      }
    });
    return result.join('\n');
  };
  return iter(tree);
};

export default plain;
