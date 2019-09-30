/**
 * then()과 catch()는 새로운 Promise 객체를 생성해 반환한다.
 */
let promise = Promise.resolve(100);

let thenPromise = promise.then((value) => {
    console.log(value);
});

let catchPromise = thenPromise.catch((error) => {
    console.error(error);
});

console.log(promise === thenPromise);
console.log(thenPromise === catchPromise);
