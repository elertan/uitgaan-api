const HttpStatus = require('http-status-codes');

class Apiresponse {
    constructor() {
        this.succesfull = true;
        this.responseCode = HttpStatus.OK;
        this.responseBody = '';
    }
}

module.exports = Apiresponse;