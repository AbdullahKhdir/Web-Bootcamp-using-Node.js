'use strict';
const _ = require('lodash');

module.exports = class Constants{
    
    #constants;
    constructor(constants = []){
        constants = {
            ROUTES: {
                ADMIN: '/admin',
                HOME: '/home',
                DEFAULT: '/'
            },
            PORTS: {
                SERVER_PORT: 8008
            },
            HTTPS_STATUS: {
                SITE_NOT_FOUND: 404
            }
        }
        this.#constants = Object.assign(constants);
    }
    
    /**
     * Gets a list of all constants
     * @returns array
     */
    getConstants()
    {
        return this.#constants;
    }

    /**
     * Sets only one and a new key value pair for a new constant
     * @param {string, int} key 
     * @param {string, int, boolean} value
     * @returns array|object
     */
    addOneConstant(key, value)
    {
        return this.#constants[key] = value;
    }

    /**
     * Appends to the constant object the passed object
     * @param {object} object
     * @returns array|object
     */
    addObjectConstant(...object)
    {
        return this.#constants = Object.assign(this.#constants, ...object);
    }

    /**
     * clears all the constants and returns true or false
     * @returns boolean
     */
    clearConstants()
    {
        this.#constants = {};
        return !this.#constants;
    }
}