let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

getURL = (url) => {
    return new Promise ((resolve, reject) => {
        let req = new XMLHttpRequest();

        req.open('GET', url, true);

        req.onload = () => {
            if (req.status == 200) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };

        req.onerror = () => {
            reject(new Error(req.statusText));
        };

        req.send();
    });
}

let request = {
    information: () => {
        return getURL('http://httpbin.org/get').then(JSON.parse);
    },
    cookie: () => {
        return getURL('http://httpbin.org/cookies').then(JSON.parse);
    }
};

let main = () => {
    return Promise.all([request.information(), request.cookie()])
}

main().then((value) => {
    console.log(value);
}).catch(error => {
    console.error(error);
});