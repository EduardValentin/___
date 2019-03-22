import { connect } from 'react-redux';
import { fetchEntityRecords, deleteRecord } from 'ducks/entities.js';
import { find } from 'ramda';
import ShowEntityData from './ShowEntityData.js';

function mapDispatchToProps(dispatch, props) {
  const { match: { params: { entityId } } } = props;
  return {
    deleteRecord: (recordId, callback) => dispatch(deleteRecord(entityId, recordId, callback)),
    fetchRecords: () => dispatch(fetchEntityRecords(entityId)),
  };
}

function mapStateToProps(state, props) {
  const { match: { params: { entityId } } } = props;

  return {
    entity: find(entity => parseInt(entity.id, 10) === parseInt(entityId, 10), state.entities.data),
    entities: state.entities,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEntityData);