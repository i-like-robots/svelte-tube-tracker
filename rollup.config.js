import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

const isProduction = !process.env.VERCEL

function createClientBundle(input) {
  return {
    input,
    output: {
      sourcemap: true,
      format: 'iife',
      name: 'app',
      dir: 'public/build/',
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
      isProduction && terser(),
    ],
  }
}

function createServerBundle(input) {
  return {
    input,
    output: {
      sourcemap: true,
      format: 'cjs',
      exports: 'default',
      dir: 'api/build/',
    },
    plugins: [
      svelte({
        compilerOptions: {
          hydratable: true,
          generate: 'ssr',
          format: 'cjs',
          dev: !isProduction,
        },
      }),
      json(),
      resolve(),
      commonjs(),
      isProduction &&
        terser({
          mangle: false,
        }),
    ],
  }
}

module.exports = [
  createClientBundle('src/client/app.js'),
  createServerBundle('src/api/home.js'),
  createServerBundle('src/api/arrivals.js'),
]
