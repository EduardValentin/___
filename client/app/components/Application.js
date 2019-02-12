import { Route, Switch } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { equals } from 'ramda';
import AdminContainer from 'components/admin/AdminContainer';

const config = require('config.json');

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: null,
    };
  }

  async componentDidMount() {
    const template = await import(`templates/${config['template-name']}/App.js`);
    this.setState({ template: template.default });
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
    const { template: Template } = this.state;

    if (!Template) {
      return null;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={Template} />
          <Route exact path="/admin" component={AdminContainer} />
        </Switch>
      </Fragment>
    );
  }
}

export default Application;
