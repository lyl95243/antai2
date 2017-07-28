// const API_SERVER = 'http://10.143.108.93:8002';
const API_SERVER = 'http://10.143.88.131:8001';
const API_ENDPOINT = '/api';

exports = module.exports = function() {
    var request = require('request');
    var proxy = (path) => (req, res) => {
        return req.pipe(request(path + req.url))
           .pipe(res);
    }
    this.use(API_ENDPOINT, proxy(API_SERVER + API_ENDPOINT));
}
exports.API_SERVER = API_SERVER;
