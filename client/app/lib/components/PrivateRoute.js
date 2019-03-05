import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends React.PureComponent {
  render() {
    const {
      isAuthenticated, redirectTo,
    } = this.props;
    return (
      isAuthenticated ? <Route {...this.props} />
        : (
          <Redirect
            to={{
              pathname: redirectTo,
            }}
          />
        )
    );
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
