module.exports = {
  extends: ['plugin:react-hooks/recommended'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}