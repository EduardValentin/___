import { connect } from 'react-redux';
import { pathOr, find } from 'ramda';
import { deleteEntity } from 'ducks/entities.js';
import EntityShow from './EntityShow.js';

function mapDispatchToProps(dispatch, props) {
  const { match: { params: { entityId } } } = props;
  return {
    deleteEntity: () => dispatch(deleteEntity(entityId)),
  };
}

function mapStateToProps(state, props) {
  const entities = pathOr(null, ['entities'], state);
  const { match: { params: { entityId } } } = props;

  return {
    entity: find(entity => entity.id === parseInt(entityId, 10), entities.data),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityShow);