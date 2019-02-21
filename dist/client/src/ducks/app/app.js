"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Immutable = require("seamless-immutable");
const Settings = require("api/settings");
const actions_1 = require("ducks/actions");
exports.initialState = {
    appLoading: false,
    appError: null,
    template: null,
};
function reducer(state = Immutable(exports.initialState), action) {
    switch (action.type) {
        case 'app/APP_LOADING':
            return state.merge({ appLoading: true });
        case 'app/APP_LOADED':
            return state.merge({ appLoading: false });
        case 'app/APP_ERROR':
            return state.merge({ appError: action.payload });
        case 'app/SET_DEFAULT_TEMPLATE':
            return state.set('template', action.payload);
        default:
            return state;
    }
}
exports.default = reducer;
exports.appLoading = actions_1.createAction('app/APP_LOADING');
exports.appLoaded = actions_1.createAction('app/APP_LOADED');
exports.appError = actions_1.createAction('app/APP_ERROR');
exports.loginUser = actions_1.createAction('app/LOGIN');
exports.logout = actions_1.createAction('app/LOGOUT');
exports.setDefaultTemplate = actions_1.createAction('app/SET_DEFAULT_TEMPLATE');
exports.fetchDefaultTemplate = () => (dispatch) => {
    return Settings.getTemplate().then((response) => {
        console.log(response.body);
        dispatch(exports.setDefaultTemplate(response.body));
    });
};
//# sourceMappingURL=app.js.map