"use strict";
const assert = require("assert");

describe("Promise Test", () => {
    it("should be fail", () => {
        return Promise.resolve.then(() => {
            assert(false);
        });
    });
});