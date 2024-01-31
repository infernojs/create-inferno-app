import babelJest from 'babel-jest';

const babelOptions = { presets: ['inferno-app'] };
export default babelJest.createTransformer(babelOptions);
