import { zipWith, keys, values } from 'ramda';

export const FIELD_TYPES = {
  text_input: 'Text Input',
  date_input: 'Date Input',
  checkmark_input: 'Checkmark Input',
};

export const asDropdownOptions = (fieldTypes) => zipWith((k, v) => {
  return {
    value: k,
    label: v,
  };
}, keys(fieldTypes), values(fieldTypes));