let promise = new Promise((resolve, reject) => {
    reject(new Error("message"));
});

promise.catch((error) => {
    console.error(error.message);
});