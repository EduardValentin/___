import React, { Component } from 'react';
import {
  reject,
  append,
  compose,
  find,
  dissoc,
} from 'ramda';
import Input from 'lib/forms/Input';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import uuid from 'uuid-js';
import NewField from './NewField';
import { FIELD_TYPES } from '../field_types';

class EditEntity extends Component {
  handleEntityNameChange = debounce((value) => {
    const { entity } = this.props;
    this.addAction({
      on: 'entity',
      action: 'rename_table',
      name: value,
      old_name: entity.name,
    });
  }, 1000);

  handleNewFieldNameChange = debounce((field, value) => {
    this.setState(prevState => ({
      newFields: {
        ...prevState.newFields,
        [field.id]: {
          ...prevState.newFields[field.id],
          name: value,
        },
      },
    }));
  });

  handleFieldNameChange = debounce((field, value) => {
    this.addAction({
      on: field.id,
      action: 'rename',
      name: value,
      old_name: field.name,
    });
  }, 1000);

  constructor(props) {
    super(props);
    this.state = {
      actions: [],
      newFields: {},
    };
  }

  fieldDeleteHandler = (field) => {
    this.setState(prevState => ({
      actions: compose(
        append({
          on: field.id,
          action: 'drop',
          name: field.name,
        }),
        reject(action => action.on === field.id),
      )(prevState.actions),
    }));
  }

  toggle = prop => () => {
    this.setState(prevState => ({
      [prop]: !prevState[prop],
    }));
  }

  addFieldHandler = () => {
    const id = uuid.create().toString();
    this.setState(prevState => ({
      newFields: {
        ...prevState.newFields,
        [id]: {
          id,
          name: '',
          type: 'text_input',
        },
      },
    }));
  }

  removeNewField = (field) => {
    this.setState(prevState => ({
      newFields: dissoc(field.id, prevState.newFields),
    }));
  }

  handleNewFieldTypeChange = (field, option) => {
    this.setState(prevState => ({
      newFields: {
        ...prevState.newFields,
        [field.id]: {
          ...prevState.newFields[field.id],
          type: option.value,
        },
      },
    }));
  }

  addAction = (action) => {
    this.setState(prevState => ({
      actions: compose(
        append(action),
        reject(act => act.on === action.on && act.action === action.action), // reject duplicated actions on the same field
      )(prevState.actions),
    }));
  }

  render() {
    const {
      entity,
      submitEdit,
    } = this.props;

    const { actions, newFields } = this.state;

    const newFieldsArray = Object.values(newFields);

    return (
      <div className="w-100 pb-6">
        <div className="action-bar mb-4 w-100 d-flex justify-content-between">
          <div>
            <Input
              label="Entity name"
              defaultValue={entity.name}
              input={{
                name: 'entity',
                onChange: e => {
                  const { value } = e.target;
                  this.handleEntityNameChange(value);
                },
              }}
            />
          </div>

          <div>
            <div onClick={() => submitEdit(this.state)} className="btn btn-gray-200 mr-2">Save</div>
            <Link to={`/admin/entities/${entity.id}`} className="btn btn-danger">Cancel</Link>
          </div>
        </div>

        {entity.UIControls.map(field => {
          const found = find(action => action.on === field.id && action.action === 'drop', actions);

          if (found) {
            return null;
          }

          return (
            <NewField
              className="py-2 stripes w-100"
              field={field}
              selectProps={{
                isDisabled: true,
                DropdownIndicator: () => null,
              }}
              handleFieldNameChange={this.handleFieldNameChange}
              defaultFieldName={field.name}
              fieldDeleteHandler={this.fieldDeleteHandler}
              defaultSelectValue={{
                value: field.type,
                label: FIELD_TYPES[field.type],
              }}
              handleSelect={(field, option) => this.addAction({
                on: field.id,
                action: 'modify',
                type: option.value,
                name: field.name,
              })}
            />
          );
        })}
        {newFieldsArray.map(newField => {
          return (
            <NewField
              className="w-100"
              field={newField}
              fieldDeleteHandler={this.removeNewField}
              handleFieldNameChange={this.handleNewFieldNameChange}
              handleSelect={this.handleNewFieldTypeChange}
            />
          );
        })}
        <div onClick={this.addFieldHandler} className="btn btn-sm btn-gray-200">Add Field</div>
      </div>

    );
  }
}

export default EditEntity;