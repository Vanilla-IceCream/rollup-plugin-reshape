import { createFilter } from 'rollup-pluginutils';
import reshape from 'reshape';

export default function(options = {}) {
  if (!options.include) options.include = '**/*.{html,sgr}';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'reshape',
    transform(code, id) {
      if (!filter(id)) return;

      return reshape(options.plugins || [])
        .process(source)
        .then(result => {
          if (result.dependencies) {
            result.dependencies.map(dep => this.addDependency(dep.file))
          }

          // If the locals option is specified, we call the output function and
          // return static html. Otherwise, we return the function & runtime to be
          // used client-side.
          if (options.locals) {
            cb(null, result.output(options.locals))
          } else {
            // TODO: more efficient shared runtime export
            cb(null, `var __runtime = ${serializeVerbatim(result.runtime)}; module.exports = ${result.output.substr(1)}`)
          }
        });
    }
  };
}
