import React from 'react';
import { Field } from 'redux-form';
import Input from 'lib/forms/Input';

const Login = (props) => {
  const { handleSubmit } = props;
  return (
    <div className="login-form d-flex align-items-center justify-content-center h-100">
      <div className="login-panel p-4 shadow">
        <h3>Log in</h3>
        <form onSubmit={handleSubmit}>
          <Field
            component={Input}
            name="username"
            label="Username"
            type="text"
          />
          <Field
            component={Input}
            name="password"
            label="Password"
            type="password"
          />
          <button className="btn btn-sm btn-primary w-100" type="submit"> Log in </button>
        </form>
      </div>
    </div>
  );
};

export default Login;