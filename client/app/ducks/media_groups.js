import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Media from 'api/media';
import { toast } from 'react-toastify';


const initialState = {
  loading: true,
  data: [],
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case 'media/SET_RECORD':
      return state.set(action.payload.type, action.payload.value);
    case 'media/SET_IN_RECORD': {
      return state.setIn(action.payload.path, action.payload.value);
    }
    default:
      return state;
  }
}

const setRecord = createAction('media/SET_RECORD');
const setInRecord = createAction('media/SET_IN_RECORD');

const setLoading = (value) => {
  return setRecord({ type: 'loading', value });
};

export const getAllGroups = () => dispatch => {
  dispatch(setLoading(true));
  return Media.getAllGroups().then(response => {
    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: response.body.data,
    }));
  }).catch(error => {
    toast.error('Couldn\'t fetch groups');
    console.error(error.message || error.body.data);
  });
};
