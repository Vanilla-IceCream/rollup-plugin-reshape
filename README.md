# rollup-plugin-reshape [![Build Status](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-reshape.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/rollup-plugin-reshape) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/rollup-plugin-reshape/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/rollup-plugin-reshape?branch=master)

Seamless integration between Rollup and Reshape.

## Install

```bash
$ npm i rollup-plugin-reshape -D
```

## Usage

```js
import { join } from 'path';
import reshape from 'reshape';
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
```
