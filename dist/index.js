"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const dotenv = require("dotenv");
const index_1 = require("./models/index");
dotenv.config();
const port = process.env.PORT || 3000;
App_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    index_1.default.User.sync();
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map