import { connect } from 'react-redux';
import NewTemplate from './NewTemplate.js';

function mapDispatchToProps() {
  return {
    addTemplate: () => {},
  };
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);