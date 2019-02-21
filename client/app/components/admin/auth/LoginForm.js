import { reduxForm } from 'redux-form';
import Login from './Login';

export default reduxForm({
  form: 'AdminLoginForm',
})(Login);