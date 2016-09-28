import deepMerge from 'deepmerge';
import Handlebars from 'handlebars/runtime';
import setDOM from 'set-dom';
import xhr from 'xhr';

window.deepMerge = deepMerge;
window.Handlebars = Handlebars;
window.setDOM = setDOM;
window.xhr = xhr;
