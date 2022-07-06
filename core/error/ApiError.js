const Constants = require("../../app/utils/Constants");

module.exports = class ApiError extends Error {
    
    #constants;
    constructor(type, message) {
        const error_msg_with_code = type + ': ' + message;
        super(error_msg_with_code);
        this.#constants = Object.assign(new Constants);
    }
 
    static handle(err, res) {
       switch (err.type) {
          case this.#constants.getConstants().HTTPS_STATUS.CLIENT_ERRORS.BAD_REQUEST:
             return new BadRequestResponse(err.message).send(res);
          default: null;
       }
    }
 }