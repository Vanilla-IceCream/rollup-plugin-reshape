import { join } from 'path';

const reshape = require('../');

import include from 'reshape-include';

export default {
  entry: join(__dirname, 'main.js'),
  dest: join(__dirname, 'bundle.js'),
  format: 'iife',
  plugins: [
    reshape({
      plugins: [include()],
    })
  ]
};
