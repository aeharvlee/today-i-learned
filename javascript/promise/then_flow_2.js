/**
 * Task A > onRejected > finalTask
 */
taskA = function () {
    console.log("Task A");
    // 이해를 돕기 위해 예외 처리 시 throw 구문을 사용했지만, 
    // Rejected 상태인 promise 객체를 반환하면 되므로 reject() 사용을 권장한다.
	throw new Error("throw Error @ Task A");
}
taskB = function () {
	console.log("Task B");
}
onRejected = function (error) {
	console.log("Catch Error: A or B", error.message);
}
finalTask = function () {
	console.log("Final Task");
}

promise = Promise.resolve();
promise.then(taskA)
	.then(taskB)
	.catch(onRejected)
	.then(finalTask);