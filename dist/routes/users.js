"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersRoutes {
    routes(app) {
        app.route('/users')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=users.js.map