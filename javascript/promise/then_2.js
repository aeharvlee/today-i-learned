/**
 * then()이 새로운 객체를 반환한다는 사실을 알고 있다면 
 * aPromise 코드는 의도대로 동작하지 않는다는 사실을 알 수 있다.
 */

 let aPromise = Promise.resolve(100);
 aPromise.then((value) => {
     return value * 2;
 });
 aPromise.then((value) => {
     return value * 2;
 });
aPromise.then((value) => {
    console.log("1: " + value);
});

let bPromise = Promise.resolve(100);
bPromise.then((value) => {
    return value * 2;
}).then((value) => {
    return value * 2;
}).then((value) => {
    console.log("2: " + value);
});