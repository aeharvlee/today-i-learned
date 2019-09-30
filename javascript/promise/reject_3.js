let promise = Promise.resolve();

promise.then((value) => {
    setTimeout(() => {
        // 1초 이상 지나면 reject(2)
    }, 1000);
    // something to work
}).catch((error) => {
    // timeout error
});