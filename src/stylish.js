import _ from 'lodash';

const indent = ' ';
const indentSize = 4;
const currentIndent = (depth) => indent.repeat(indentSize * depth - 2);
const braceIndent = (depth) => indent.repeat(indentSize * depth - indentSize);

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const lines = _.entries(value)
    .map(([key, valueKey]) => `${currentIndent(depth)}  ${key}: ${stringify(valueKey, depth + 1)}`);
  const result = ['{',
    ...lines,
    `${braceIndent(depth)}}`].join('\n');

  return result;
};

const stylish = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const lines = currentValue.map((node) => {
      switch (node.type) {
        case 'added':
          return `${currentIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return `${currentIndent(depth)}- ${node.key}: ${stringify(node.oldValue, depth + 1)}\n${currentIndent(depth)}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'nested':
          return `${currentIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error('Uncorrect data');
      }
    });
    const result = ['{',
      ...lines,
      `${braceIndent(depth)}}`].join('\n');
    return result;
  };

  return iter(tree, 1);
};

export default stylish;
