timerPromisefy = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(delay);
        }, delay);
    });
}

let startDate = Date.now();

Promise.all([
    timerPromisefy(1),
    timerPromisefy(32),
    timerPromisefy(64),
    timerPromisefy(128)
]).then((values) => {
    console.log(Date.now() - startDate + 'ms');
    console.log(values)
});