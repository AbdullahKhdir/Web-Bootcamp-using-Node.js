'use strict';

const Express = require('../framework/Express');

module.exports = class Routes extends Express{
    
    #framework;
    constructor() {
        super();

        if (typeof this.router !== 'undefined') {
            return this.getInstance();
        }
        this.#framework = new Express().framework
        
        /*
        * This line of code is responsible for the 
        * difference between "/route" and "/route/" 
        */        
        this.#framework.Router({strict: false});

        this.router     = this.framework.Router();
        this.express    = this.framework;
    }

    /**
     * @function getRouterInstance
     * @description  gets an instance of the Routes class
     * @version 1.0.0
     * @author Khdir, Abdullah <abdullahkhder77@gmail.com>
     * @return {Routes}
     */
    getRouterInstance() {
        return this.router;
    }

    /**
     * @function getExpressInstance
     * @description  gets an instance of the Express class
     * @version 1.0.0
     * @author Khdir, Abdullah <abdullahkhder77@gmail.com>
     * @return {Express}
     */
    getExpressInstance() {
        return this.express;
    }
}