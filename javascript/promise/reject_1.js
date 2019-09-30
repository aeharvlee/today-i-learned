// use reject instead of throw
// Promise에서 추상화하고 있는 로직은 try-catch와 유사하므로 처리 중
// throw가 발생해도 프로그램은 종료되지 않고 promise 객체의 상태가 Rejected 된다. 
let promise = new Promise((resolve, reject) => {
    throw new Error("message");
});

promise.catch((error) => {
    console.error(error.message);
});

