import {
  split,
  compose,
  find,
  last,
  ifElse,
  isNil,
  identity,
} from 'ramda';

export const getSession = () => { };

export const getUserToken = () => {
  const session = sessionStorage.getItem('maintainer-token');
  const cookie = _getMaintainerTokenCookie();
  return cookie || session;
};

//  ============  Utility Functions

const _getMaintainerTokenCookie = () => {
  return compose(
    ifElse(
      isNil,
      identity, // if does not exist we return null
      compose(
        last,
        split('='),
      ),
    ),
    find(cookie => cookie.includes('maintainer-token')),
    split(';'),
  )(document.cookie);
};