import { connect } from 'react-redux';
import { getAllTemplates, deleteTemplate } from 'ducks/templates.js';
import TemplatesIndex from './TemplatesIndex.js';

function mapDispatchToProps(dispatch) {
  return {
    fetchTemplates: () => dispatch(getAllTemplates()),
    deleteTemplate: (id) => dispatch(deleteTemplate(id)),
  };
}

function mapStateToProps(state) {
  return {
    templates: state.templates,
    entities: state.entities,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesIndex);