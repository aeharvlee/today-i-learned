"use strict"

const assert = require("assert");
const Person = require("../person");

describe("Person methods", () => {
	it("should rejects when url is not a string", async () => {
		const aeharv = new Person("aeharv");
		await aeharv.getData();
	});
});
