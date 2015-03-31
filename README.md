# radixer

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Downloads][downloads-image]][downloads-url]

This package lets you convert a big number like `123456789` to a short string like `7MyqL`, and back again.

You can do the same thing natively with `.toString()` and `parseInt()`, but only up to a radix of 36 (using the 26 letters `a-z` and the 10 digits `0-9`). This package uses a larger character set (including `A-Z`, `-` and `_`, totalling 64), so you get shorter strings that are still URL-friendly.

## Install

```sh
$ npm install radixer
```

Also works fine in the browser via Browserify – no dependencies.

## Basic usage

```js
var radixer = require('radixer');

radixer.numberToString(12345678); // l65E
radixer.stringToNumber('l65E'); // 12345678
```

The default radixer uses the following 64 characters:

```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_
```


### Alternative API

Use the module as a **constructor** to get a custom radixer, using whatever character set you want.

The more characters you provide, the shorter your strings will be.

```js
var Radixer = require('radixer');

var radixer = new Radixer('àêīöû!@%$^&*;[]'); // 15 chars

radixer.numberToString(12345); // ö^[à
radixer.stringToNumber('ö^[à'); // 12345
```


## Licence

MIT

[npm-image]: https://img.shields.io/npm/v/radixer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/radixer
[travis-image]: https://img.shields.io/travis/callumlocke/radixer.svg?style=flat-square
[travis-url]: https://travis-ci.org/callumlocke/radixer
[downloads-image]: http://img.shields.io/npm/dm/radixer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/radixer
