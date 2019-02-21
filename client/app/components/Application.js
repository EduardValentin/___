import { Route, Switch } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { equals } from 'ramda';
import AdminContainer from 'components/admin/AdminContainer';
import LoginForm from 'components/admin/auth/LoginForm';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TemplateComponent: null,
    };
  }

  async componentDidMount() {
    const { actions: { fetchDefaultTemplate } } = this.props;
    fetchDefaultTemplate();
  }

  async componentDidUpdate(prevProps) {
    const {
      location,
      error,
      actions: { setAppError },
      template: {
        data: {
          setting_value,
        },
      },
    } = this.props;
    /**
     * one should check if route changed while application has errors
     * case in which appError should reset
     */
    if (!equals(location, prevProps.location) && error) {
      setAppError(null);
    }

    const { TemplateComponent } = this.state;
    // Should update state only if template name changed or if it fetched
    if (!TemplateComponent || prevProps.template.data.setting_value !== setting_value) {
      const template = await import(`templates/${setting_value}/App.js`);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ TemplateComponent: template.default });

      // Import the css file for the selected template
      import(`templates/${setting_value}/style.js`);
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
    const { TemplateComponent } = this.state;

    if (!TemplateComponent) {
      return null;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={TemplateComponent} />
          <Route exact path="/admin" component={AdminContainer} />
          <Route exact path="/admin/login" component={LoginForm} />
        </Switch>
      </Fragment>
    );
  }
}

export default Application;
