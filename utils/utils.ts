import { isNil, isEmpty, anyPass, compose, dropLast, trim, curry } from 'ramda';
import drop from 'ramda/es/drop';

export const isBlank = anyPass([isNil, isEmpty]);

/**
 * Checks if name contains only underscore, decimal or letters. If not, it throws an error. Should be executed in a try block.
 * @param name Is the name of the table or the fields corresponding to a table
 */
export const verifyEntityOrFields = (name: string) => {
  if (!entity_fields_test.test(name)) {
    throw 'Invalid input or table name';
  }
}

/** 
 * Trims white spaces from both margins of the string including the last comma at the end of the string 
 * @param string 
 */
export const removeCommaFromQuery = (string: string) => {
  return compose(
    dropLast(1),
    trim,
  )(string);
};

export const appendTablePrefix = (table_name) => {
  return process.env.USER_TABLE_PREFIX + table_name;
};

const entity_fields_test = new RegExp(/^[a-zA-Z0-9_]+$/);