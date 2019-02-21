"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const Immutable = require("seamless-immutable");
const redux_form_1 = require("redux-form");
const app_1 = require("ducks/app/app");
const initialState = Immutable({
    app: {
        appLoading: false,
    },
});
// Logging Middleware. Logs all actions to console
const logger = (store) => (next) => (action) => {
    const result = next(action);
    console.groupCollapsed('[ACTION]', action.type);
    console.log('Payload:', action.payload);
    console.log('State:', store.getState());
    // console.groupEnd('[ACTION]', action.type);
    return result;
};
// Catch Errors before logger so they don't get gobbled up by the console group
const crashReporter = (store) => (next) => (action) => {
    try {
        return next(action);
    }
    catch (err) {
        console.groupEnd();
        console.error('Caught an exception!', err);
        throw err;
    }
};
// add reducers and their actions in ducks/
// More: https://github.com/erikras/ducks-modular-redux
const reducer = redux_1.combineReducers(Object.assign({}, {
    app: app_1.default,
    form: redux_form_1.reducer,
}));
let finalCreateStore = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default, crashReporter, logger))(redux_1.createStore)(reducer, initialState);
exports.default = finalCreateStore;
//# sourceMappingURL=store.js.map