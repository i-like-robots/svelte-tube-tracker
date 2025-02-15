import js from '@eslint/js'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...svelte.configs['flat/recommended'],
  {
    ignores: ['api/build/', 'public/build/'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['src/client/*.js', 'src/components/*.svelte'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
]
