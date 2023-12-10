import babelJest from 'babel-jest';

const babelOptions = { presets: ['react-app'] };
export default babelJest.createTransformer(babelOptions);
