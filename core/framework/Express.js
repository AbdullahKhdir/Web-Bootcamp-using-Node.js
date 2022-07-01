'use strict';

module.exports = class Express{
    
    constructor(framework = require('express')) {
        this.framework = framework;
    }
}