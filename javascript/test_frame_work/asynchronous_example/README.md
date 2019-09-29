Async functions and async methods do not throw erros in a strict sense.

Async functions and async methods always return a Promise, either resolved or rejected.

You must attach then() and catch(), no matter what. (Or wrap the method inside try/catch).
A rejected Promise will propagate up in the stack unless you catch it.
