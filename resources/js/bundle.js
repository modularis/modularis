const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const rollup = require('rollup');

glob('resources/js/controller/**/*.js', {}, (error, files) => {
  files.forEach((file) => {
    rollup.rollup({
      entry: file,
      plugins: [
        buble(),
        nodeResolve({
          jsnext: true,
          browser: true
        }),
        commonjs()
      ]
    }).then((bundle) => {
      bundle.write({
        format: 'iife',
        dest: `app/public/js/${path.parse(file).base}`,
        sourceMap: 'inline'
      });
    });
  });
});
