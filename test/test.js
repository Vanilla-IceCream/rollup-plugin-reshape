import { join } from 'path';
import { rollup } from 'rollup';

import reshape from '../';

import include from 'reshape-include';

process.chdir(__dirname);

const bundler = (entry, options) => rollup({ entry, plugins: [reshape(options)] });

describe('rollup-plugin-reshape', () => {
  it('should import html from file as string', () => {
    return bundler('fixtures/basic/main.js')
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'reshape' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>Foo<\/p>/);
    });
  });

  it('should output empty sourcemap', () => {
    return bundler('fixtures/basic/main.js')
      .then(result => {
        const { map } = result.generate({ format: 'es', sourceMap: true });
        expect(map).toBeDefined();
        expect(map.file).toBeNull();
    });
  });

  it('should be able to use the plugins option', () => {
    return bundler('fixtures/plugins/main.js', { plugins: [include()] })
      .then(result => {
        const { code } = result.generate({ format: 'iife', moduleName: 'reshape' });
        expect(code).toBeDefined();
        expect(code).toMatch(/<p>Foo<\/p>/);
        expect(code).toMatch(/<p>Bar<\/p>/);
    });
  });
});
