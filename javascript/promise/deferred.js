function Deferred() {
    this.promise = new Promise(function (resolve, reject) {
        this._resovle = resolve;
        this._reject = reject;
    }.bind(this));
}

Deferred.prototype.resolve = function (value) {
    this._resovle.call(this.promise, value);
}

Deferred.prototype.reject = function (reason) {
    this._reject.call(this.promise, reason);
}