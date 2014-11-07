'use strict';

var defaultCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';

var Radixer = function (characters) {
  if (!this instanceof Radixer) throw new Error('Constructor called without "new"');

  if (characters == null) {
    this.characters = defaultCharacters;
    this.radix = 64;
  }
  else {
    if (typeof characters !== 'string') throw new TypeError('Expected string');
    var count = characters.length;

    var i, chr;
    for (i = 0; i < count; i++) {
      chr = characters.charAt(i);
      if (characters.indexOf(chr, i + 1) !== -1)
        throw new Error('String contains one or more repeated characters');
    }

    this.characters = characters;
    this.radix = count;
  }
};

Radixer.prototype.numberToString = function (number) {
  if (
    typeof number !== 'number' || number === Infinity ||
    isNaN(number) || number < 0 || number % 1 !== 0
  ) throw new Error('Expected a natural number');

  var rixit;
  var result = '';
  while (true) {
    rixit = number % this.radix;
    result = this.characters.charAt(rixit) + result;
    number = Math.floor(number / this.radix);
    if (number === 0) break;
  }

  return result;
};

Radixer.prototype.stringToNumber = function (string) {
  if (typeof string !== 'string')
    throw new TypeError('Expected string');

  var result = 0;

  for (var i = 0, l = string.length; i < l; i++) {
    var index = this.characters.indexOf(string.charAt(i));

    if (index === -1)
      throw new Error('String contains characters not in set');

    result = (result * this.radix) + index;
  }

  return result;
};


var radix64 = new Radixer();

Radixer.numberToString = function (number) {
  return radix64.numberToString(number);
};

Radixer.stringToNumber = function (number) {
  return radix64.stringToNumber(number);
};


module.exports = Radixer;
