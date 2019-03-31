import React from 'react';
import classNames from 'classnames';

const Input = (props) => {
  const {
    meta: {
      touched,
      error,
    },
    input,
    label,
    type,
    defaultValue,
    className,
  } = props;

  return (
    <div className={classNames(className, 'form-group')}>
      {label && (
        <label htmlFor={input.name}>
          {label}
        </label>
      )}
      <input defaultValue={defaultValue} {...input} id={input.name} type={type} className="form-control" />
      {touched && error && <span className="error text-danger">{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  meta: {},
}

export default Input;