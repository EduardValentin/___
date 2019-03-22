import { connect } from 'react-redux';
import { getAllTemplates } from 'ducks/templates.js';
import TemplatesIndex from './TemplatesIndex.js';

function mapDispatchToProps(dispatch) {
  return {
    fetchTemplates: () => dispatch(getAllTemplates()),
  };
}

function mapStateToProps(state) {
  return {
    templates: state.templates,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesIndex);