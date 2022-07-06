const Constants = require("../../app/utils/Constants");

module.exports = class ApiResponse {

    #status_code;
    #response_status;
    #message;
    #codes;
    constructor(status_code, response_status, message = '') {
        this.#message         = message;
        this.#status_code     = status_code;
        this.#response_status = response_status;
        this.#codes           = Object.assign(new Constants());
    }
 
    renderAsJson(res, response) {
        res.type(this.#codes.getConstants().RESPONSE.TYPES.JSON);
        if (typeof this.#status_code === 'undefined') {
            return res.status(this.#codes.getConstants().HTTPS_STATUS.SUCCESS.OK).json(ApiResponse.sanitize(response));
        }
        return res.status(this.#status_code).json(ApiResponse.sanitize(response));
    }

    render(res, view, options = {}, callback = null) {
        res.type(this.#codes.getConstants().RESPONSE.TYPES.HTML);
        if (typeof this.#status_code === 'undefined') {
            return res.status(this.#codes.getConstants().HTTPS_STATUS.SUCCESS.OK).render(view, options, callback);
        }
        return res.status(this.#status_code).render(view, options, callback);
    }
 
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // delete {some_field};
        delete clone.status;
        for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
        return clone;
    }
}