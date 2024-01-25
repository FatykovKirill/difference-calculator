import yaml from 'js-yaml';

const parsing = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`${format} is not supporting`);
  }
};

export default parsing;
