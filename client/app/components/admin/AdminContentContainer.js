import { connect } from 'react-redux';
import { fetchEntities } from 'ducks/entities';
import { pathOr } from 'ramda';
import AdminContent from './AdminContent';

function mapStateToProps(state) {
  return {
    entities: pathOr(null, ['entities'], state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEntities: () => dispatch(fetchEntities()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContent);