import { Route, Redirect } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { equals } from 'ramda';

import ContentContainer from 'components/content/ContentContainer';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps) {
    const {
      location,
      error,
      actions: { setAppError },
    } = this.props;

    /**
     * one should check if route changed while application has errors
     * case in which appError should reset
     */
    if (!equals(location, prevProps.location) && error) {
      setAppError(null);
    }
  }

  /**
   * catches all js errors from its children
   * @param {*} error
   */
  componentDidCatch(error) {
    const { actions: { setAppError } } = this.props;
    setAppError(error);
  }

  render() {
    return (
      <Fragment>
        <header>
          <span className="navbar-brand text-uppercase">React Starter Kit</span>
        </header>

        <main>
          <Route exact path="/" render={() => <Redirect to="/content" />} />
          <Route
            exact
            path="/content"
            component={ContentContainer}
          />
        </main>

        <footer />

      </Fragment>
    );
  }
}

export default Application;
