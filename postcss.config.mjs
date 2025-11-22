import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';

export default {
  plugins: [
    postcssImport(),
    postcssSimpleVars(),
    postcssMixins(),
    postcssNested(),
  ]
}
