import { Route, Switch } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { equals } from 'ramda';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import AdminContainer from './admin/AdminContainer';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TemplateComponent: null,
    };
  }

  async componentDidMount() {
    const {
      actions: { fetchDefaultTemplate },
    } = this.props;
    fetchDefaultTemplate();
  }

  async componentDidUpdate(prevProps) {
    const {
      location,
      error,
      actions: { setAppError },
      template,
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
    if (!template.loading && (
      !TemplateComponent || prevProps.template.data.setting_value !== template.data.setting_value)) {
      const importedTemplate = await import(`templates/${template.data.setting_value}/App.js`);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ TemplateComponent: importedTemplate.default });

      // // Import the css file for the selected template
      // import(`templates/${setting_value}/style.js`);
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
    const { template } = this.props;

    if (!TemplateComponent || template.loading) {
      return <LoadingSpinner />;
    }

    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={TemplateComponent} />
          <Route path="/admin" component={AdminContainer} />
        </Switch>
      </Fragment>
    );
  }
}

export default Application;
