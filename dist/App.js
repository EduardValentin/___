"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Express = require("express");
const user_1 = require("./routes/user");
const settings_1 = require("./routes/settings");
const entities_1 = require("./routes/entities");
const generic_1 = require("./routes/generic");
const templates_1 = require("./routes/templates");
const pages_1 = require("./routes/pages");
const media_1 = require("./routes/media");
const Path = require("path");
class App {
    constructor() {
        this.express = Express();
        this.express.use(Express.json({ limit: '500mb' }));
        this.mountRoutes();
    }
    mountRoutes() {
        this.express.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
            next();
        });
        this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
        this.express.use('/api/v1/users', user_1.default);
        this.express.use('/api/v1/settings', settings_1.default);
        this.express.use('/api/v1/entities', entities_1.default);
        this.express.use('/api/v1/generic_entities', generic_1.default);
        this.express.use('/api/v1/templates', templates_1.default);
        this.express.use('/api/v1/pages', pages_1.default);
        this.express.use('/api/v1/media', media_1.default);
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map