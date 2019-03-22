import { createAction } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as Entities from 'api/entities';
import { toast } from 'react-toastify';
import { findIndex, reject } from 'ramda';

export default function reducer(state = Immutable({}), action) {
  switch (action.type) {
    case 'entities/SET_RECORD':
      return state.set(action.payload.type, action.payload.value);
    case 'entities/SET_IN_RECORD': {
      return state.setIn(action.payload.path, action.payload.data);
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
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    toast.error(error.body.message);
  });
};


export const newEntity = (payload) => (dispatch, getState) => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));
  return Entities.newEntity(payload).then(res => {
    const { entities } = getState();
    dispatch(setRecord({
      type: 'data',
      value: entities.data.concat(res.body.data),
    }));
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    window.location.hash = `/admin/entities/${res.body.data.id}`;
  }).catch(error => {
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    toast.error(error.body.message);
  });
};

export const deleteEntity = (entity_id) => (dispatch, getState) => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));

  return Entities.drop(entity_id).then(() => {
    window.location.hash = '/admin/entities';
    toast.success('Entity deleted');
    const { entities } = getState();

    dispatch(setRecord({
      type: 'data',
      value: entities.data.filter((entity) => entity.id !== parseInt(entity_id, 10)),
    }));

    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
  }).catch(error => {
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    toast.error(error.body.message);
  });
};


export const editEntity = (entity_id, params) => (dispatch, getState) => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));
  return Entities.edit(entity_id, { fields: params }).then(r => {
    window.location.hash = `/admin/entities/${entity_id}`;
    toast.success('Entity modified');
    const { entities } = getState();
    const index = findIndex(entity => parseInt(entity.id, 10) === parseInt(entity_id, 10), entities.data);
    dispatch(setInRecord({
      id: entity_id,
      path: ['data', index],
      data: r.body.data,
    }));

    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
  }).catch(error => {
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    toast.error(error.body.message);
  });
};


export const fetchEntityRecords = (entity_id) => (dispatch, getState) => {
  return Entities.fetchRecords(entity_id).then(r => {
    const { entities } = getState();
    const index = findIndex(entity => parseInt(entity.id, 10) === parseInt(entity_id, 10), entities.data);
    dispatch(setInRecord({
      id: entity_id,
      data: r.body.data,
      path: ['data', index, 'records'],
    }));
  }).catch(error => {
    toast.error(error.body ? error.body.message : error.message);
  });
};


export const addRecordToEntity = (entity_id, params) => (dispatch, getState) => {
  return Entities.addRecord(entity_id, { fields: params }).then(r => {
    const { entities } = getState();
    const index = findIndex(entity => parseInt(entity.id, 10) === parseInt(entity_id, 10), entities.data);
    dispatch(setInRecord({
      id: entity_id,
      data: r.body.data,
      path: ['data', index, 'records'],
    }));
    window.location.hash = `/admin/entities/${entity_id}/records`;
    toast.success('Record added');
  }).catch(error => {
    toast.error(error.body ? error.body.message : error.message);
  });
};

export const editRecordfromEntity = (entity_id, record_id, params) => (dispatch, getState) => {
  return Entities.editRecord(entity_id, record_id, { fields: params }).then(r => {
    const { entities } = getState();
    const index = findIndex(entity => parseInt(entity.id, 10) === parseInt(entity_id, 10), entities.data);
    const recordIndex = findIndex(record => parseInt(record.id, 10) === parseInt(record_id, 10), entities.data[index]);
    dispatch(setInRecord({
      id: entity_id,
      data: r.body.data,
      path: ['data', index, 'records', recordIndex],
    }));
    window.location.hash = `/admin/entities/${entity_id}/records`;
    toast.success('Record modified');
  }).catch(error => {
    toast.error(error.body ? error.body.message : error.message);
  });
};


export const deleteRecord = (entity_id, record_id, callback) => (dispatch, getState) => {
  dispatch(setRecord({
    type: 'loading',
    value: true,
  }));
  return Entities.deleteRecord(entity_id, record_id).then(() => {
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    const { entities } = getState();
    const index = findIndex(entity => parseInt(entity.id, 10) === parseInt(entity_id, 10), entities.data);
    dispatch(setInRecord({
      data: reject(record => record.id === parseInt(record_id, 10), entities.data[index].records),
      path: ['data', index, 'records'],
    }));
    toast.success('Record modified');

    if (callback) {
      callback();
    }
  }).catch(error => {
    dispatch(setRecord({
      type: 'loading',
      value: false,
    }));
    toast.error(error.body ? error.body.message : error.message);
  });
};