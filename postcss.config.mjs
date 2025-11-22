import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssMixins from 'postcss-mixins';

export default {
  plugins: [
    postcssImport(),
    postcssSimpleVars(),
    postcssMixins(),
  ]
}
