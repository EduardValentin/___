import React, { Component } from 'react'
import Input from 'lib/forms/Input';
import { Field } from 'redux-form';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Select from 'lib/forms/Select';

const noSpacesValidator = value => (value && /\s/.test(value) ? 'The link cannot contain any spaces' : undefined);
const required = value => (value ? undefined : 'Required');

export default class NewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      handleSubmit,
      entities,
      pristine,
      submitting,
      reset,
    } = this.props;

    if (entities.loading) {
      return <LoadingSpinner />;
    }

    const entitiesOptions = entities.data.map(entity => {
      return {
        label: entity.name,
        value: entity.id,
      };
    });
    return (
      <div className="new-page">
        <form onSubmit={handleSubmit}>
          <Field
            name="id"
            type="hidden"
            component={Input}
          />

          <Field
            component={Input}
            name="label"
            type="text"
            validate={required}
            label="Label"
          />

          <Field
            component={Input}
            name="link"
            type="text"
            validate={[noSpacesValidator, required]}
            label="Link"
          />

          <Field
            name="Entities"
            label="Entity"
            validate={required}
            options={entitiesOptions.asMutable()}
            isMulti
            component={Select}
          />

          <div>
            <button type="submit" className="btn btn-sm btn-primary mr-1" disabled={submitting}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </form>
      </div>
    );
  }
}
