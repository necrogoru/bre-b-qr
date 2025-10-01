export default {
  plugins: {
    'postcss-import': {},
    'postcss-extend': {},
    'postcss-mixins': {},
    'postcss-simple-vars': {},
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false }
    }
  }
}
