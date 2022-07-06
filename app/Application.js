'use strict';
/*
* Npm and Node Modules 
*/
const Bodyparser     = require('../core/node/Bodyparser.js');
const Path           = require('../core/node/Path.js');
const BaseController = require('../core/controller/BaseController.js');
const Constants      = require('./utils/Constants.js');
const Lodash         = require('./utils/Lodash.js');
const helmet         = require("helmet");

module.exports = class Application extends BaseController {

    #app;
    constructor(app) {
        super();

        if (typeof this.app !== 'undefined') {
            return this.getApp();
        }
        
        this.body_parser    = new Bodyparser().body_parse;
        this.path           = new Path().path;
        this.constants      = Object.assign(new Constants());
        this.sub_controller = this;
        this._              = new Lodash()._; 

        /*
        * Init The Application
        */
        app = this.express();
        
        /*
        * Sets the follwing policies
          ! contentSecurityPolicy
          ! crossOriginEmbedderPolicy
          ! crossOriginOpenerPolicy
          ! crossOriginResourcePolicy
          ! dnsPrefetchControl
          ! expectCt
          ! frameguard
          ! hidePoweredBy
          ! hsts
          ! ieNoOpen 
          ! noSniff
          ! originAgentCluster 
          ! permittedCrossDomainPolicies
          ! referrerPolicy
          ! xssFilter
        */
        app.use(helmet.contentSecurityPolicy());
        app.use(helmet.crossOriginEmbedderPolicy());
        app.use(helmet.crossOriginOpenerPolicy());
        app.use(helmet.crossOriginResourcePolicy());
        app.use(helmet.dnsPrefetchControl());
        app.use(helmet.expectCt());
        app.use(helmet.frameguard());
        app.use(helmet.hidePoweredBy());
        app.use(helmet.hsts());
        app.use(helmet.ieNoOpen());
        app.use(helmet.noSniff());
        app.use(helmet.originAgentCluster());
        app.use(helmet.permittedCrossDomainPolicies());
        app.use(helmet.referrerPolicy());
        app.use(helmet.xssFilter());

        /*
        * AUTO ESCAPE JSON
        */
        app.set('json escape', true);
       
        /*
        * USE EJS TEMPLATE ENGINE (NODE SUPPORTS TWIG)
        */
        app.set('view engine', 'ejs');

        /*
        * Specify the templates folder of the view property in express 
        */
        app.set('views', 'app/views');

        /*
        * Parse The Requests
        */
        app.use(this.body_parser.urlencoded({extended: false}));
        
        /*
        * Middleware To Set Static Public Folder
        */
        var options = {
            dotfiles: 'ignore',
            etag: true,
            extensions: ['ejs'],
            fallthrough: true,
            immutable: true,
            index: false,
            maxAge: '1d',
            redirect: false,
            setHeaders: function (res, path, stat) {
              res.set('x-timestamp', Date.now())
            }
        }
        app.use(this.express.static(this.path.join(__dirname, 'public'), options));

        /*
        * Middleware To Always Get The First User
        */
       app.use((req, res, next) => {
            const User = require('./models/shop/User');
            let user_model = new User();
            user_model.get({name: 'Abdullah'})
            .then(rows => {
                if (!this._.isEmpty(rows)) {
                        req.registered_user = rows[0];
                        req.registered_user.getCart = function () {
                            let Cart = require('../app/models/shop/Cart');
                            let cart_model = new Cart();
                            return cart_model.filter({user_id: req.registered_user.id});
                        };
                        req.registered_user.getProducts = function () {
                            let Product = require('../app/models/shop/Product');
                            let product_model = new Product();
                            return product_model.filter({user_id: req.registered_user.id});
                        }
                        next();
                    } else {
                        res.send('<h1>Could not fetch user id</h1>');
                        res.end();
                    }
                })
                .catch(err => console.log(err));
       });
        
        /*
        * Routes 
        */
        this.sub_controller.deployRoutes(app);

        this.#app = app;
    }

    /**
     * @function getApp
     * @description  gets an instance of the application class
     * @version 1.0.0
     * @author Khdir, Abdullah <abdullahkhder77@gmail.com>
     * @return Application Object
     */
    getApp() {
        return this.#app;
    }

    /**
     * @function getConstants
     * @description  gets an instance of the constants class
     * @version 1.0.0
     * @author Khdir, Abdullah <abdullahkhder77@gmail.com>
     * @return Constants Object
     */
    getConstants() {
        return this.constants;
    }
}



