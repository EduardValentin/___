import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Pages from 'api/pages';
import { toast } from 'react-toastify';
import reject from 'ramda/es/reject';
import findIndex from 'ramda/es/findIndex';

const initialState = {
  loading: true,
  data: [],
};

export default function reducer(state = Immutable(initialState), action) {
  switch (action.type) {
    case 'pages/SET_RECORD':
      return state.set(action.payload.type, action.payload.value);
    case 'pages/SET_IN_RECORD': {
      return state.setIn(action.payload.path, action.payload.value);
    }
    default:
      return state;
  }
}

const setRecord = createAction('pages/SET_RECORD');
const setInRecord = createAction('pages/SET_IN_RECORD');

const setLoading = (value) => {
  return setRecord({ type: 'loading', value });
};

export const fetchPages = () => (dispatch) => {
  dispatch(setLoading(true));
  return Pages.fetchAll().then(result => {
    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: result.body.data,
    }));
  }).catch(error => {
    dispatch(setLoading(false));
    const err = error.message || error.body.message;
    toast.error(err);
  });
};

export const newPage = (params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  return Pages.create(params).then(result => {
    const { pages } = getState();
    dispatch(setLoading(false));
    const Entities = params.entities.map(ent => ({ id: ent }));
    dispatch(setRecord({
      type: 'data',
      value: pages.data.concat({ ...result.body.data, Entities }),
    }));
    toast.success('Page created');
  }).catch(error => {
    dispatch(setLoading(false));
    const err = error.body.message || error.message;
    toast.error(err);
  });
};

export const editPage = (id, params) => (dispatch, getState) => {
  dispatch(setLoading(true));
  return Pages.edit(id, params).then(result => {
    const { pages } = getState();
    dispatch(setLoading(false));
    const pageIndex = findIndex(pg => pg.id === parseInt(id, 10), pages.data);
    const Entities = params.entities.map(ent => ({ id: ent }));
    dispatch(setInRecord({
      path: ['data', pageIndex],
      value: { ...result.body.data, Entities },
    }));
    toast.success('Page modified');
  }).catch(error => {
    dispatch(setLoading(false));
    const err = error.body.message || error.message;
    toast.error(err);
  });
};

export const deletePage = (id) => (dispatch, getState) => {
  dispatch(setLoading(true));
  return Pages.destroy(id).then(() => {
    const { pages } = getState();
    dispatch(setLoading(false));
    dispatch(setRecord({
      type: 'data',
      value: reject(page => page.id === parseInt(id, 10), pages.data),
    }));
  }).catch(error => {
    dispatch(setLoading(false));
    const err = error.message || error.body.message;
    toast.error(err);
  });
};
