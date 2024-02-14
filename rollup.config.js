const terser = require('@rollup/plugin-terser')
// const filesize = require('rollup-plugin-filesize');
// const license = require('rollup-plugin-license');
const typescript = require('@rollup/plugin-typescript')
// const sourceMaps = require('rollup-plugin-sourcemaps');
const dts = require('rollup-plugin-dts').default
const path = require('path')
const pkg = require('./package.json')

const resolve = (...args) => path.resolve(...args)
const input = resolve('./src', 'index.ts')

// const licenseBanner = license({
//   banner: {
//     content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
//     commentStyle: 'none'
//   }
// })

module.exports = [
  {
    input,
    plugins: [
      terser(),
      // licenseBanner, // must be applied after terser
      // filesize(),
      typescript()
      // sourceMaps()
      // dts(),
    ],
    output: [
      {
        format: 'cjs',
        file: `lib/${pkg.name}.cjs.js`,
        sourcemap: true
      },
      {
        format: 'es',
        file: `lib/${pkg.name}.esm.js`,
        sourcemap: true
      },
      {
        format: 'umd',
        file: `lib/${pkg.name}.min.js`,
        name: 'LocalStorePro',
        noConflict: true,
        sourcemap: true
      }
    ]
  },
  {
    input,
    // plugins: [licenseBanner, dts()],
    plugins: [dts()],
    output: [
      {
        format: 'es',
        file: `lib/${pkg.name}.d.ts`
      }
    ]
  }
]
