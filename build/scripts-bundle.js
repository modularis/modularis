const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const glob = require('glob');
const nodeResolve = require('rollup-plugin-node-resolve');
const path = require('path');
const rollup = require('rollup');

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

const globalDependencies = 'resources/js/app/global.js';
rollup.rollup(Object.assign({ entry: globalDependencies }, config)).then((bundle) => {
  bundle.write({
    format: 'iife',
    dest: `app/public/js/${path.parse(globalDependencies).base}`
  }).catch((error) => console.log(error)); // eslint-disable-line no-console
});

const controllers = glob.sync('resources/js/controller/**/*.js');
controllers.forEach((file) => {
  rollup.rollup(Object.assign({ entry: file }, config)).then((bundle) => {
    bundle.write({
      format: 'iife',
      dest: `app/public/js/${path.parse(file).base}`,
      sourceMap: 'inline'
    });
  }).catch((error) => console.log(error)); // eslint-disable-line no-console
});

const serviceWorker = 'resources/js/app/service-worker.js';
rollup.rollup(Object.assign({ entry: serviceWorker }, config)).then((bundle) => {
  bundle.write({
    format: 'iife',
    dest: `app/public/${path.parse(serviceWorker).base}`
  }).catch((error) => console.log(error)); // eslint-disable-line no-console
});
