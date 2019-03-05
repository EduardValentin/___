import { connect } from 'react-redux';
import { newEntity } from 'ducks/entities.js';
import { toast } from 'react-toastify';
import NewEntity from './NewEntity.js';


const entity_fields_test = new RegExp(/^[a-zA-Z0-9_]+$/);

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (formValues) => {
      // validation
      const { fields, name: entity_name } = formValues;
      let error = false;
      if (!entity_name || !entity_fields_test.test(entity_name)) {
        toast.error('Entity name not valid');
        error = true;
      }

      if (fields.length === 0) {
        toast.error('Entity must have at least one field');
        error = true;
      }

      fields.forEach(field => {
        if (!field.name || !entity_fields_test.test(field.name) || !field.type) {
          toast.error('Invalid fields');
          error = true;
        }
      });

      if (error) {
        return;
      }

      dispatch(newEntity(formValues)).then(() => toast.success('Entity created'));
    },
  };
}

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEntity);