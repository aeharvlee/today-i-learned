class Person {
    constructor(name) {
        if (typeof name !== "string") {
            throw TypeError("name must be a string");
        }
        this.name = name;
    }

    async getData(url) {
        if (typeof url !== "string") {
            throw TypeError("url must be a string");
        }

    }
}

module.exports = Person;