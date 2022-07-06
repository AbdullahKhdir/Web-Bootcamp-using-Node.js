module.exports = class ApiResponse {

    #status_code;
    #response_status;
    #message;
    constructor(status_code, response_status, message = '') {
        this.#message         = message;
        this.#status_code     = status_code;
        this.#response_status = response_status;
    }
 
    renderAsJson(res, response) {
        res.type('application/json');
        return res.status(this.#status_code).json(ApiResponse.sanitize(response));
    }

    render(res, view, options = {}, callback = null) {
        res.type('html');
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