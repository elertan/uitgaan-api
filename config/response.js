const HttpStatus = require('http-status-codes');

class Response {
    constructor() {
        this.succesfull = true;
        this.responseCode = HttpStatus.OK;
        this.responseBody = '';
    }
}

module.exports = Response;