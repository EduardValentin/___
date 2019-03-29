import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Templates from 'api/templates';
import { toast } from 'react-toastify';
import { reject } from 'ramda';

const initialState = {
  loading: true,
  data: [],
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case 'templates/SET_RECORD':
      return state.set(action.payload.type, action.payload.value);
    case 'templates/SET_IN_RECORD': {
      return state.setIn(action.payload.path, action.payload.data);
    }
    default:
      return state;
  }
}

const setRecord = createAction('templates/SET_RECORD');
const setInRecord = createAction('templates/SET_IN_RECORD');

const setLoading = (value) => {
  return setRecord({ type: 'loading', value });
};

export const getAllTemplates = () => (dispatch) => {
  dispatch(setLoading(true));
  return Templates.getAll().then(response => {
    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: response.body.data,
    }));
  }).catch(error => {
    dispatch(setLoading(false));
    toast.error(error.message);
  });
};

export const addTemplate = (params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  return Templates.addTemplate(params).then(response => {
    const templates = getState().templates.data;

    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: templates.concat([response.body.data]),
    }));
  }).catch(error => {
    dispatch(setLoading(false));
    toast.error(error.body.message || error.message);
  });
};


export const deleteTemplate = (id) => (dispatch, getState) => {
  dispatch(setLoading(true));
  return Templates.deleteTemplate(id).then(response => {
    const templates = getState().templates;
    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: reject(template => template.id === parseInt(id, 10), templates.data),
    }));
  }).catch(error => {
    dispatch(setLoading(false));
    toast.error(error.body.message || error.message);
  });
};
