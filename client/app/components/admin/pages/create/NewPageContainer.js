import { connect } from 'react-redux';
import NewPage from './NewPage.js';
import { reduxForm } from 'redux-form';
import pathOr from 'ramda/es/pathOr';
import { newPage } from 'ducks/pages.js';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (values) => {
      const { entity, link, label } = values;
      const entityIds = entity.map(ent => ent.value);
      dispatch(newPage({ entities: entityIds, link, label }));
    },
  };
}

function mapStateToProps(state) {
  return {
    entities: pathOr(null, ['entities'], state),
  };
}

const FormComponent = reduxForm({
  form: 'NewPageForm',
})(NewPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);