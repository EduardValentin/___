"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = require("./App");
const DatabasePool_1 = require("./DatabasePool");
require('dotenv').config();
const port = process.env.PORT || 3000;
App_1.default.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    return console.log(`server is listening on ${port}`);
});
process.on('SIGTERM', () => {
    DatabasePool_1.default.getInstance().endPool();
});
process.on('SIGKILL', () => {
    DatabasePool_1.default.getInstance().endPool();
});
//# sourceMappingURL=index.js.map