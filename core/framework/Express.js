'use strict';

const Response = require('../response/types/Response');

module.exports = class Express extends Response{
    
    constructor(framework = require('express')) {
        super();
        this.framework = framework;
    }
}