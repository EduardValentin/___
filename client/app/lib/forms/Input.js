import React from 'react';
import classNames from 'classnames';

const Input = (props) => {
  const {
    touched,
    error,
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
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;