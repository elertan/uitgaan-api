const HttpStatus = require('http-status-codes');

class ApiResponse {
    constructor() {
        this.succesfull = true;
        this.responseCode = HttpStatus.OK;
        this.responseBody = '';
    }
}

module.exports = ApiResponse;