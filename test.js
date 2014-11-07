/*jshint expr: true*/
/*global describe, it*/
'use strict';

var expect = require('chai').expect;

var allUnique = function (array) {
  for (var i = 0, l = array.length; i < l; i++) {
    if (array.indexOf(array[i], i + 1) !== -1)
      return false;
  }
  return true;
};

describe('Radixer', function () {
  it('works with default 64 characters', function () {
    var radixer = require('./index');

    var max = 10000;
    var strings = [];
    for (var i = 0; i < max; i++) {
      strings[i] = radixer.numberToString(i);
      expect(radixer.stringToNumber(strings[i])).to.equal(i);
    }

    expect(allUnique(strings)).to.equal(true);
  });

  it('works with a custom character set', function () {
    var Radixer = require('./index');
    var radixer = new Radixer('àêīöû!@%$^&*;[]');

    var max = 10000;
    var strings = [];
    for (var i = 0; i < max; i++) {
      strings[i] = radixer.numberToString(i);
      expect(radixer.stringToNumber(strings[i])).to.equal(i);
    }

    expect(allUnique(strings)).to.equal(true);
  });

  describe('errors', function () {
    it('constructor rejects bad input', function () {
      var Radixer = require('./index');

      expect(function () {
        new Radixer('abcdefgbxyz'); // two b's
      }).to.throw('String contains one or more repeated characters');

      expect(function () {
        new Radixer(54321); // wrong type
      }).to.throw('Expected string');
    });
    
    it('numberToString rejects bad input', function () {
      var radixer = require('./index');

      expect(function () {
        radixer.numberToString(123.001);
      }).to.throw('Expected a natural number');

      expect(function () {
        radixer.numberToString(123.0);
      }).not.to.throw;

      expect(function () {
        radixer.numberToString('123');
      }).to.throw('Expected a natural number');
    });

    it('stringToNumber rejects bad input', function () {
      var radixer = require('./index');

      expect(function () {
        radixer.stringToNumber(123);
      }).to.throw('Expected string');

      expect(function () {
        radixer.stringToNumber('123.');
      }).to.throw('String contains characters not in set');
    });
  });
});
