/**
 * onRejected can't handle error.
 */
taskA = function() {
	console.log("Task A");
}
taskB = function() {
	console.log("Task B");
}
onRejected = function (error) {
	throw new Error("Unknown error during FinalTask()");
	console.log("Catch Error: A or B", error);
}
finalTask = function () {
	console.log("Final Task");
}

let promise = Promise.resolve();
promise.then(taskA)
	.then(taskB)
	.catch(onRejected)
	.then(finalTask);

/**
 * Task A > onRejected > finalTask
 */
taskA = function () {
	console.log("Task A");
	throw new Error("throw Error @ Task A");
}
taskB = function () {
	console.log("Task B");
}
onRejected = function (error) {
	console.log("Catch Error: A or B", error);
}
finalTask = function () {
	console.log("Final Task");
}

promise = Promise.resolve();
promise.then(taskA)
	.then(taskB)
	.catch(onRejected)
	.then(finalTask);
