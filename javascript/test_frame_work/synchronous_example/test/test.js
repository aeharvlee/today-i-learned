const assert = require("assert");
const upperCase = require("../function");
const Person = require('../person');

describe("upperCase function", () => {
    it("should throws when name is not provided", () => {
        assert.throws(() => upperCase());
    });
    it("should throws when name is not a string", () => {
        assert.throws(() => upperCase(9));
    });
});

describe("Person class", () => {
    it("should throws when name is not provided", () => {
        assert.throws(() => new Person());
    });
    it("should throws when name is not a string", () => {
        assert.throws(() => new Person(9));
    })
});