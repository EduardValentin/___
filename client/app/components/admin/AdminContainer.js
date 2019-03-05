import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import { fetchUserDetails } from 'ducks/app';
import Admin from './Admin';

function mapStateToProps(state) {
  return {
    user: pathOr(null, ['app', 'user'], state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserDetails: () => dispatch(fetchUserDetails()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);