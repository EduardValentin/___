import { connect } from 'react-redux';
import NewTemplate from './NewTemplate.js';
import { addTemplate } from 'ducks/templates.js';
import { toast } from 'react-toastify';
import mapObjIndexed from 'ramda/es/mapObjIndexed';

function mapDispatchToProps(dispatch) {
  return {
    addNewTemplate: (state) => {
      if (!state.name || !state.template) {
        toast.error('Required fields cannot be empty');
      }
      else {
        // const formData = new FormData();
        // mapObjIndexed((val, key) => {
        //   formData.append(key, val);
        // }, state);
        dispatch(addTemplate(state));
      }
    },
  };
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTemplate);