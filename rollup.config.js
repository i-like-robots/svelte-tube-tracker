import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

const isProduction = process.env.BUILD === 'production'

module.exports = {
  input: 'src/client/bootstrap.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js',
  },
  plugins: [
    svelte({
      compilerOptions: {
        hydratable: true,
        dev: !isProduction,
      },
    }),
    resolve({
      browser: true,
    }),
    commonjs(),
  ],
}
