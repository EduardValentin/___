import { connect } from 'react-redux';
import pathOr from 'ramda/es/pathOr';
import { fetchOne } from 'ducks/entities.js';
import EntityShow from './EntityShow.js';

function mapDispatchToProps(dispatch, props) {
  const { match: { params: { entityId } } } = props;
  return {
    fetchEntity: () => dispatch(fetchOne(entityId)),
  };
}

function mapStateToProps(state) {
  return {
    entities: pathOr(null, ['entities'], state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityShow);