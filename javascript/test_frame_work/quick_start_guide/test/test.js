// 1. Assert style
let assert = require('chai').assert;
let numbers = [1, 2, 3, 4, 5];

assert.isArray(numbers, 'is array of numbers');
assert.include(numbers, 2, 'array contains 2');
assert.lengthOf(numbers, 5, 'array contains 5 numbers');

// 2. Expect style
let expect = require('chai').expect;

expect(numbers).to.be.an('array').that.includes(2);
expect(numbers).to.have.lengthOf(5);

// 3. Should stlye
let should = reqruie('chia').should();
numbers.should.be.an('array').that.includes(2);
numbers.should.have.lengthOf(5);
