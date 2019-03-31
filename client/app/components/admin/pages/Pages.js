import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import PagesIndexContainer from './index/PagesIndexContainer';
import NewPageContainer from './create/NewPageContainer';
export default class Pages extends Component {

  componentDidMount() {
    const { fetchPages } = this.props;
    fetchPages();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/admin/pages" component={PagesIndexContainer} />
        <Route exact path="/admin/pages/new" component={NewPageContainer} />
      </Switch>
    );
  }
}
