"use strict";
const assert = require("assert");

describe("Promise Test", () => {
    it("should return a promise object", () => {
        let promise = Promise.resolve();

        return promise.then((value) => {
            assert(value === 1);
        });
    });
});