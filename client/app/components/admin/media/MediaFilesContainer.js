import { getAllGroups } from 'ducks/media_groups';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import MediaFiles from './MediaFiles.js';

function mapDispatchToProps(dispatch) {
  return {
    fetchGroups: () => dispatch(getAllGroups()),
  };
}

function mapStateToProps(state) {
  return {
    media_groups: pathOr(null, ['media_groups'], state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaFiles);