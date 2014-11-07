/*jshint expr: true*/
/*global describe, it*/
'use strict';

var expect = require('chai').expect;

describe('Radixer', function () {
  it('works with default 64 characters', function () {
    var radixer = require('./index');

    var max = 10000;
    for (var i = 0; i < max; i++) {
      var string = radixer.numberToString(i);
      expect(radixer.stringToNumber(string)).to.equal(i);
    }
  });

  it('works with a custom character set', function () {
    var Radixer = require('./index');
    var radixer = new Radixer('àêīöû!@%$^&*;[]');

    var max = 10000;
    for (var i = 0; i < max; i++) {
      var string = radixer.numberToString(i);
      expect(radixer.stringToNumber(string)).to.equal(i);
    }
  });

  it('rejects bad input', function () {
    var Radixer = require('./index');

    expect(function () {
      new Radixer('abcdefgbxyz'); // two b's
    }).to.throw(/repeating/);

    expect(function () {
      new Radixer(54321); // wrong type
    }).to.throw('Expected string');

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
});
