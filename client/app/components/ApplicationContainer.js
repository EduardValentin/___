import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appError } from 'ducks/app.js';

import Application from 'components/Application';

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setAppError: appError,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
