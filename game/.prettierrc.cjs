module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports'),
  ],

  // prettier
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',

  // @trivago/prettier-plugin-sort-imports
  importOrder: ['^@app/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};
