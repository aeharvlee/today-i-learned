/**
 * 각 반환값은 Promise.resolve(반환값)처럼 처리되기 때문에 무엇을 반환하더라도
 * 최종적으로는 Promise 객체가 반환된다.
 */
doubleUp = function (value) {
    return value * 2;
}

increment = function (value) {
    return value + 1;
}

output = function (value) {
    console.log(value);
}

promise = Promise.resolve(1);
promise.then(increment)
	.then(doubleUp)
	.then(output);