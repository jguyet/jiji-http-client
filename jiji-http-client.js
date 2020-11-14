/**
 *  Jiji Framework HttpClient 2020
 *  Author : Jeremy Guyet
 *  Version : 0.0.1
 */
var HttpClient = {
    get: (query, callbacks) => HttpClient.query({
        url: null,
        headers: {},
        body: null,
        method: 'GET',
        bodyParser: 'text'
    }, query, callbacks),
    post: (query, callbacks) => HttpClient.query({
        url: null,
        headers: {},
        body: null,
        method: 'POST',
        bodyParser: 'text'
    }, query, callbacks),
    patch: (query, callbacks) => HttpClient.query({
        url: null,
        headers: {},
        body: null,
        method: 'PATCH',
        bodyParser: 'text'
    }, query, callbacks),
    delete: (query, callbacks) => HttpClient.query({
        url: null,
        headers: {},
        body: null,
        method: 'DELETE',
        bodyParser: 'text'
    }, query, callbacks),
    put: (query, callbacks) => HttpClient.query({
        url: null,
        headers: {},
        body: null,
        method: 'PUT',
        bodyParser: 'text'
    }, query, callbacks),
    query: (defaultQuery, query, callbacks = [() /** Sucess */ => {}, () /** Failure */ => {}]) => {
        Object.keys(defaultQuery).forEach(x => { if (query[x] == undefined) query[x] = defaultQuery[x]; });
        var xhr = new XMLHttpRequest();
        xhr.open(query.method, query.url, true);
        Object.keys(query.headers).forEach(key => xhr.setRequestHeader(key, query.headers[key]));// Headers
        xhr.onreadystatechange = HttpClient.private_onreadystatechange[query.bodyParser](callbacks);
        xhr.send(query.body);
    },
    private_onreadystatechange: {
        response: (callbacks) => {
            return function() { // force function for insert this
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    callbacks[0](this.response);
                } else if (this.readyState === XMLHttpRequest.DONE) {
                    callbacks[1](this);
                }
            };
        },
        text: (callbacks) => {
            return HttpClient.private_onreadystatechange["response"]([(resp) => { callbacks[0](resp)}, callbacks[1]]);
        },
        json: (callbacks) => {
            return HttpClient.private_onreadystatechange["response"]([(resp) => { callbacks[0](JSON.parse(resp))}, callbacks[1]]);
        }
    }
};

// only before browserify with nodejs
if (typeof(module) !== 'undefined') {
	module.exports = HttpClient;
}
// [exports] HttpClient to GUI
if (typeof(document) !== 'undefined') {
    document.HttpClient = HttpClient;
}
if (typeof(window) !== "undefined") {
    window.HttpClient = HttpClient;
}