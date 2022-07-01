'use strict';

const Application = require('./app/Application');

class Server extends Application{
    
    constructor() {
        super();
    }

    run() {
        let port = Server.init().port();
        this.getApp().listen(port, () => {
            console.log('Server is running!');
        });
    }

    port() {
        return this.constants.getConstants().PORTS.SERVER_PORT;
    }

    static init() {
        let server = new Server();
        return server;
    }
}


let system = new Server();
system.run();