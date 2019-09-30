// Run this code in browser console
delayPromise = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

setTimeout(() => {
    alert("100ms passed.");
}, 100);

delayPromise(100).then(() => {
    alert("promise 100ms passed.");
})