'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var reshape = _interopDefault(require('reshape'));

var index = function(options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{html,sgr}'; }

  var filter = rollupPluginutils.createFilter(options.include, options.exclude);

  return {
    name: 'reshape',
    transform: function transform(code, id) {
      if (!filter(id)) { return; }

      return reshape({
          plugins: options.plugins || [],
          parser: options.parser,
          generator: options.generator,
          parserOptions: options.parserOptions,
          generatorOptions: options.generatorOptions,
          runtime: options.runtime || {},
          filename: options.filename,
        })
        .process(code)
        .then(function (result) {
          return {
            code: ("export default " + (JSON.stringify(result.output()))),
            map: { mappings: '' }
          };
          // if (result.dependencies) {
          //   result.dependencies.map(dep => this.addDependency(dep.file))
          // }
          //
          // // If the locals option is specified, we call the output function and
          // // return static html. Otherwise, we return the function & runtime to be
          // // used client-side.
          // if (options.locals) {
          //   cb(null, result.output(options.locals))
          // } else {
          //   // TODO: more efficient shared runtime export
          //   cb(null, `var __runtime = ${serializeVerbatim(result.runtime)}; module.exports = ${result.output.substr(1)}`)
          // }
        });
    }
  };
};

module.exports = index;
//# sourceMappingURL=rollup-plugin-reshape.cjs.js.map
