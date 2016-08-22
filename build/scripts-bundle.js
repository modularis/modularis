const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const rollup = require('rollup');

const controllers = glob.sync('resources/js/controller/**/*.js');
const config = {
  plugins: [
    buble(),
    nodeResolve({
      jsnext: true,
      browser: true
    }),
    commonjs()
  ]
};

controllers.forEach((file) => {
  rollup.rollup(Object.assign({ entry: file }, config)).then((bundle) => {
    bundle.write({
      format: 'iife',
      dest: `app/public/js/${path.parse(file).base}`,
      sourceMap: 'inline'
    });
  });
});

const serviceWorker = 'resources/js/app/service-worker.js';
rollup.rollup(Object.assign({ entry: serviceWorker }, config)).then((bundle) => {
  bundle.write({
    format: 'iife',
    dest: `app/public/${path.parse(serviceWorker).base}`
  });
});
