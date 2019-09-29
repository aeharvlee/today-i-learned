new Promise(function(resolve){
	resolve(42);
}).then(function(value){
	console.log(value);
});

// use Promise.resovle
// status of promise object will be "Resolved".
Promise.resolve(42).then(function(value){
	console.log(value);
});

new Promise(function(resolve,reject){
	reject(new Error('error'));
}).catch(function(error){
	console.error(error.message);
});

// use Promise.reject
// status of promise object will be "Rejected".
Promise.reject(new Error('error'))
	.catch(function(error){
			console.error(error.message);
	});
