"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const User_1 = require("./routes/User");
const Path = require("path");
class App {
    constructor() {
        this.express = Express();
        this.express.use(Express.json());
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
        this.express.use('/api/users', User_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map