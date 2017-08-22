import { createFilter } from 'rollup-pluginutils';
import reshape from 'reshape';

var index = function(options) {
  if ( options === void 0 ) options = {};

  if (!options.include) { options.include = '**/*.{html,sgr}'; }

  var filter = createFilter(options.include, options.exclude);

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
        });
    }
  };
};

export default index;
//# sourceMappingURL=rollup-plugin-reshape.es.js.map
