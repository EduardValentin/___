import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pathOr from 'ramda/es/pathOr';
import { newPage, editPage } from 'ducks/pages.js';
import NewPage from './NewPage.js';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (values) => {
      const { closeModal = () => {}, edit } = ownProps;
      const {
        Entities,
        link,
        label,
        id,
      } = values;

      console.log(values);

      const ids = Entities.map(ent => ent.value);
      if (!edit) {
        dispatch(newPage({ entities: ids, link, label }));
      } else {
        dispatch(editPage(id, { entities: ids, link, label }));
      }
      closeModal();
    },
  };
}

function mapStateToProps(state, props) {
  const { getInitialValues = () => ({}) } = props;

  return {
    entities: pathOr(null, ['entities'], state),
    initialValues: getInitialValues(),
  };
}

const FormComponent = reduxForm({
  form: 'NewPageForm',
})(NewPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);