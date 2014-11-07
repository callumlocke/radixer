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
});
