import React, { memo } from 'react';
import Input from 'lib/forms/Input';
import Select from 'lib/forms/Select';
import classNames from 'classnames';
import { FIELD_TYPES, asDropdownOptions } from '../field_types';

const NewField = memo(({
  field,
  className,
  selectProps,
  fieldDeleteHandler,
  defaultFieldName,
  defaultSelectValue,
  handleSelect,
  handleFieldNameChange,
}) => {
  return (
    <div className={classNames(className, 'new-field flex-nowrap row')}>
      <Input
        input={{
          onChange: (e) => {
            const { value } = e.target;
            handleFieldNameChange(field, value);
          },
          name: field.id,
          defaultValue: defaultFieldName,
          placeholder: 'Field name',
        }}
        type="text"
        label="Name"
        className="mr-2 col-4 input"
      />
      <Select
        groupClass="select col-4"
        placeholder="Field type"
        label="Type"
        {...selectProps}
        defaultValue={defaultSelectValue}
        options={asDropdownOptions(FIELD_TYPES)}
        onChange={(opt) => handleSelect(field, opt)}
      />
      <div className="col-4 d-flex align-items-end">
        <i onClick={() => fieldDeleteHandler(field)} className="ion-android-delete action-icon" />
      </div>
    </div>
  );
});

export default NewField;