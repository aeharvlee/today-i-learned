function upperCase(name) {
    if (typeof name !== "string") {
        throw TypeError("name must be a string");
    }
    return name.toUpperCase();
}

module.exports = upperCase;