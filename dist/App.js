"use strict";
exports.__esModule = true;
var Express = require("express");
var User_1 = require("./routes/User");
var Path = require("path");
var App = /** @class */ (function () {
    function App() {
        this.express = Express();
        this.express.use(Express.json());
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        this.express.use('/', Express.static(Path.join(__dirname, '/..', 'client', 'dist')));
        this.express.use('/api/users', User_1["default"]);
    };
    return App;
}());
exports["default"] = new App().express;
//# sourceMappingURL=App.js.map