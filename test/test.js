import { join } from 'path';
import { rollup } from 'rollup';

import reshape from '../';

import include from 'reshape-include';

process.chdir(__dirname);

const bundler = (input, options = {}) => rollup({ input, plugins: [reshape(options)] });

describe('rollup-plugin-reshape', () => {
  it('should import html from file as string', async () => {
    const { generate } = await bundler('fixtures/basic/main.js');
    const { code } = await generate({ format: 'iife', name: 'reshape' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>Foo<\/p>/);
  });

  it('should output empty sourcemap', async () => {
    const { generate } = await bundler('fixtures/basic/main.js');
    const { map } = await generate({ format: 'es', sourcemap: true });

    expect(map).toBeDefined();
    expect(map.file).toBeNull();
  });

  it('should be able to use the plugins option', async () => {
    const { generate } = await bundler('fixtures/plugins/main.js', { plugins: [include()] });
    const { code } = await generate({ format: 'iife', name: 'reshape' });

    expect(code).toBeDefined();
    expect(code).toMatch(/<p>Foo<\/p>/);
    expect(code).toMatch(/<p>Bar<\/p>/);
  });
});
