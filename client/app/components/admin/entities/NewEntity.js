/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import uuid from 'uuid-js';
import Select from 'lib/forms/Select';
import Input from 'lib/forms/Input';
import { adjust, findIndex, propEq } from 'ramda';
import { FIELD_TYPES, asDropdownOptions } from 'components/admin/field_types';
import { haltEvent } from 'utils';

const newField = {
  type: null,
  name: null,
};

class NewEntity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      fields: [],
    };
  }

  handleInputTyping = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addNewField = () => {
    this.setState(prevState => ({
      fields: [...prevState.fields, { ...newField, id: uuid.create().toString() }],
    }));
  }

  _findFieldWithId = (id) => {
    const {
      fields,
    } = this.state;
    return findIndex(propEq('id', id), fields);
  }

  handleSelect = (id, option) => {
    const index = this._findFieldWithId(id);

    this.setState(prevState => ({
      fields: adjust((obj) => ({
        ...obj,
        type: option.value,
      }), index, prevState.fields),
    }));
  }

  handleFieldNameChange = (id, e) => {
    const index = this._findFieldWithId(id);

    const { value } = e.target;

    this.setState(prevState => ({
      fields: adjust((obj) => ({
        ...obj,
        name: value,
      }), index, prevState.fields),
    }));
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    const {
      fields,
    } = this.state;

    const typesOptions = asDropdownOptions(FIELD_TYPES);

    return (
      <div className="new-entity-page">
        <div className="w-50">
          <div className="form-group">
            <label htmlFor="name">Entity Name:</label>
            <input
              onChange={this.handleInputTyping}
              className="form-control"
              placeholder="Enter entity name"
              type="text"
              id="name"
              name="name"
            />
          </div>

          <h4 className="mb-2">Fields:</h4>

          {/* Dynamic fields here */}

          {fields.map(field => {
            return (
              <div key={field.id} className="d-flex align-items-center">
                <Input
                  input={{
                    onChange: (e) => this.handleFieldNameChange(field.id, e),
                    name: field.id,
                    placeholder: 'Field name',
                  }}
                  type="text"
                  label="Name"
                  className="mr-2 w-50"
                />
                <Select
                  groupClass="w-50"
                  placeholder="Field type"
                  label="Type"
                  options={typesOptions}
                  onChange={(opt) => this.handleSelect(field.id, opt)}
                />
              </div>
            );
          })}

          <button
            onClick={this.addNewField}
            className="btn my-2 d-block btn-gray-400 text-gray-900 btn-sm"
          >
            Add field
          </button>

          <button
            onClick={e => haltEvent(() => handleSubmit(this.state), e)}
            className="btn d-block my-2 btn-primary btn-sm"
          >
            Submit
          </button>

        </div>
      </div>
    );
  }
}

export default NewEntity;