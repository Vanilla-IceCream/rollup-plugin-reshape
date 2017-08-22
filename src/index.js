import { createFilter } from 'rollup-pluginutils';
import reshape from 'reshape';

export default function(options = {}) {
  if (!options.include) options.include = '**/*.{html,sgr}';

  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'reshape',
    transform(code, id) {
      if (!filter(id)) return;

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
        .then(result => {
          return {
            code: `export default ${JSON.stringify(result.output())}`,
            map: { mappings: '' }
          };
        });
    }
  };
}
