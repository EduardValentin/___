import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { appError, fetchDefaultTemplate } from 'ducks/app.js';
import Application from 'components/Application';
import { pathOr } from 'ramda';

function mapStateToProps(state) {
  return {
    app: state.app,
    template: pathOr(null, ['app', 'template'], state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchDefaultTemplate,
      setAppError: appError,
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Application);
