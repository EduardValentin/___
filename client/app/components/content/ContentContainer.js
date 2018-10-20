import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Content from 'components/content/Content';

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Content);
