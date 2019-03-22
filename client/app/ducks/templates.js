import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Templates from 'api/templates';
import { toast } from 'react-toastify';

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