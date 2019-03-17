/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import ReactSelect, { Creatable, components } from 'react-select';
import classnames from 'classnames';
import { is, find, prop } from 'ramda';

// lookink for better ideas
// match value when they are not objects
const parseValue = (value, options, getOptionValue) => {
  if (!value) {
    return value;
  }
  if (is(Array, value)) {
    if (!value[0]) {
      return value;
    }
    if (!is(Object, value[0])) { // [ids] => [{ value, label }]
      return value.map(el => {
        return find(val => el === getOptionValue(val), options);
      });
    }
    return value;
  }
  if (!is(Object, value)) {  // id => { value, label }
    return find(el => value === getOptionValue(el), options);
  }
  return value;
};

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      input = {},
      placeholder,
      label = '',
      required = false,
      isMulti = false,
      creatable,
      inputClass,
      groupClass,
      getOptionValue,
      value,
      defaultValue,
      styles = {},
      options,
      DropdownIndicator,
    } = this.props;

    const SelectComp = creatable ? Creatable : ReactSelect;

    return (
      <div className={classnames(groupClass, 'form-group')}>
        {label && (
          <label>
            {label}
            {required && ' *'}
          </label>
        )}

        <SelectComp
          {...this.props}
          {...input}
          value={parseValue(input.value || value, options, getOptionValue)}
          isMulti={isMulti}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={classnames(inputClass)}
          classNamePrefix="custom-select"
          components={{
            DropdownIndicator,
          }}
          styles={{
            ...styles,
          }
          }
        />
      </div>
    );
  }
}

Select.defaultProps = {
  getOptionValue: prop('value'),
  getLabelValue: prop('label'),
  DropdownIndicator: (props) => {
    return components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <i className="ion-chevron-down" />
      </components.DropdownIndicator>
    );
  },
};
