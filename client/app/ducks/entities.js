import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Entities from 'api/entities';
import { findIndex, adjust } from 'ramda';
import { appError } from './app';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'entities/SET_RECORD':
      return state.set(action.payload.type, action.payload.value);
    case 'entities/SET_IN_RECORD': {
      const index = findIndex(d => d.id === parseInt(action.payload.id, 10), state.data);
      let data = state.data.asMutable();
      data = adjust((current) => ({ ...current, ...action.payload.values }), index, data);
      return state.set('data', data);
    }
    default:
      return state;
  }
}

const setRecord = createAction('entities/SET_RECORD');
const setInRecord = createAction('entities/SET_IN_RECORD');


export const fetchEntities = () => dispatch => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));
  return Entities.getAllEntities().then(r => {
    dispatch(setRecord({
      type: 'data',
      value: r.body.data,
    }));

    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
  }).catch(error => {
    dispatch(appError(error.message));
    dispatch(setRecord({
      type: 'loading',
      value: true,
    }));
  });
};


export const newEntity = (payload) => dispatch => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));

  return Entities.newEntity(payload).then(r => {
    dispatch(setRecord({
      type: 'data',
      value: r.body.data,
    }));

    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
  }).catch(error => {
    dispatch(appError(error.message));
    dispatch(setRecord({
      type: 'loading',
      value: true,
    }));
  });
};

export const fetchOne = (withId) => dispatch => {
  dispatch(setInRecord({
    id: withId,
    values: {
      loading: true,
    },
  }));
  debugger

  return Entities.fetchOne(withId).then(r => {
    debugger
    
    dispatch(setInRecord({
      id: withId,
      values: {
        ...r.body.data,
        loading: false,
      },
    }));


    dispatch(setInRecord({
      id: withId,
      value: {
        loading: false,
      },
    }));
  }).catch(error => {
    dispatch(appError(error.message));
    dispatch(setInRecord({
      id: withId,
      value: {
        loading: false,
      },
    }));
  });
};