import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import EntityShowContainer from './EntityShowContainer';
import NewEntity from './NewEntity';

class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-flex h-100 w-100 p-0">
        <Switch>
          <Route exact path="/admin/entities/new" component={NewEntity} />
          <Route exact path="/admin/entities/:entityId" component={EntityShowContainer} />
        </Switch>
      </div>
    );
  }
}

export default Entities;