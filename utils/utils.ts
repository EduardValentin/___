import {isNil, isEmpty, anyPass } from 'ramda';

export const isBlank = anyPass([isNil, isEmpty]);