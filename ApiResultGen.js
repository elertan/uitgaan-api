function getBaseApiResult() {
    return {
        time: new Date().toString()
    };
} 

export default class ApiResult {
    static success(data) {
        return Object.assign(getBaseApiResult(), {
            data
        });
    } 

    static error(message) {
        return Object.assign(getBaseApiResult(), {
            err: {
                message
            }
        });
    }

    static badRequest(ve) {
        return Object.assign(getBaseApiResult(), {
            badRequest: {
                errors: ve.array()
            }
        });
    } 
}