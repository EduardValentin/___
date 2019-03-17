/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import uuid from 'uuid-js';
import {
  adjust,
  findIndex,
  propEq,
  reject,
} from 'ramda';
import debounce from 'lodash.debounce';
import NewField from './NewField';

const newField = {
  type: 'text_input',
  name: null,
};

class NewEntity extends Component {
  handleInputTyping = debounce(value => {
    this.setState({
      name: value,
    });
  }, 500);

  handleFieldNameChange = debounce((field, value) => {
    const { fields } = this.state;

    const index = this._findFieldWithId(field.id);
    this.setState({
      fields: adjust((elem) => ({ ...elem, name: value }), index, fields),
    });
  }, 500);

  constructor(props) {
    super(props);
    this.state = {
      name: null,
      fields: [],
    };
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

  handleSelect = (field, option) => {
    const index = this._findFieldWithId(field.id);

    this.setState(prevState => ({
      fields: adjust((obj) => ({
        ...obj,
        type: option.value,
      }), index, prevState.fields),
    }));
  }

  fieldDeleteHandler = (field) => {
    this.setState(prevState => ({
      fields: reject((elem) => elem.id === field.id, prevState.fields),
    }));
  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    const {
      fields,
    } = this.state;
    console.log(this.props);

    return (
      <div className="new-entity-page w-100">
        <div>
          <div className="form-group w-25">
            <label htmlFor="name">Entity Name:</label>
            <input
              onChange={(e) => {
                const { value } = e.target;
                this.handleInputTyping(value);
              }}
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
              <NewField
                key={field.id}
                field={field}
                className="w-100"
                handleSelect={this.handleSelect}
                fieldDeleteHandler={this.fieldDeleteHandler}
                handleFieldNameChange={this.handleFieldNameChange}
              />
            );
          })}

          <button
            onClick={this.addNewField}
            className="btn my-2 d-block btn-gray-400 text-gray-900 btn-sm"
          >
            Add field
          </button>

          <button
            onClick={() => handleSubmit(this.state)}
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