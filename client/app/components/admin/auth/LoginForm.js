import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { logInAction } from 'ducks/app';
import Login from './Login';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: values => {
      dispatch(logInAction(values));
    },
  };
}

const FormComponent = reduxForm({
  form: 'AdminLoginForm',
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);