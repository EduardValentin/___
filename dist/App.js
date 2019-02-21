"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const user_1 = require("./routes/user");
const settings_1 = require("./routes/settings");
const Path = require("path");
class App {
    constructor() {
        this.express = Express();
        this.express.use(Express.json());
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
        this.express.use('/api/v1/users', user_1.default);
        this.express.use('/api/v1/settings', settings_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map