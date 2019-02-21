"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const App_1 = require("App");
const app_1 = require("ducks/app/app");
// import { AppActions } from 'ducks/app/types';
function mapDispatchToProps(dispatch) {
    return {
        fetchDefaultTemplate: () => dispatch(app_1.fetchDefaultTemplate()),
    };
}
function mapStateToProps(store) {
    return {};
}
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App_1.default);
//# sourceMappingURL=AppContainer.js.map