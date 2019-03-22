import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import TemplatesIndexContainer from './TemplatesIndexContainer';
import NewTemplateContainer from './NewTemplateContainer';

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/admin/templates" component={TemplatesIndexContainer} />
          <Route exact path="/admin/templates/new" component={NewTemplateContainer} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Templates;