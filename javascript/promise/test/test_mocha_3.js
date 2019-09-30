"use strict";
const assert = require("assert");

let mayBeRejected = () => {
    return Promise.reject(new Error("woo"));
}

let failTest = () => {
    throw new Error("Expected promise to be rejected but it was fulfilled");
}

describe("Promise Test", () => {
    it("is bad pattern", () => {
        return mayBeRejected().catch((error) => {
            assert(error.message === "woo");
        });
    });

    it("should bad pattern", () => {
        return mayBeRejected().then(failTest).catch((error) => {
            assert(error.message === "woo");
        })
    })
});