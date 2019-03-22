import { connect } from 'react-redux';
import { addRecordToEntity, fetchEntityRecords, editRecordfromEntity } from 'ducks/entities.js';
import { find, mapObjIndexed, values } from 'ramda';
// import { toast } from 'react-toastify';
import RecordForm from './RecordForm.js';

function mapDispatchToProps(dispatch, props) {
  const { match: { params: { entityId, action, recordId } } } = props;
  return {
    fetchRecords: () => dispatch(fetchEntityRecords(entityId)),

    handleSubmit: (params) => {
      const fields = mapObjIndexed((value, name) => {
        return {
          name,
          value,
        };
      }, params);
      if (action === 'create') {
        dispatch(addRecordToEntity(entityId, values(fields)));
      } else if (action === 'edit') {
        dispatch(editRecordfromEntity(entityId, recordId, values(fields)));
      }
    },
  };
}

function mapStateToProps(state, props) {
  const { match: { params: { entityId } } } = props;

  return {
    entity: find(entity => parseInt(entity.id, 10) === parseInt(entityId, 10), state.entities.data),
    entities: state.entities,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordForm);