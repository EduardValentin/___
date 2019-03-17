import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import EntityShowContainer from './EntityShowContainer';
import EditEntityContainer from './EditEntityContainer';
import NewEntityContainer from './NewEntityContainer';
import ShowEntityDataContainer from './ShowEntityDataContainer';
import RecordFormContainer from './RecordFormContainer';

class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="d-flex h-100 w-100 p-0">
        <Switch>
          <Route exact path="/admin/entities/new" component={NewEntityContainer} />
          <Route exact path="/admin/entities/:entityId/records" component={ShowEntityDataContainer} />
          {/* :action can be create or edit */}
          <Route exact path="/admin/entities/:entityId/records/:action/:recordId?" component={RecordFormContainer} />
          <Route exact path="/admin/entities/:entityId" component={EntityShowContainer} />
          <Route exact path="/admin/entities/:entityId/edit" component={EditEntityContainer} />
        </Switch>
      </div>
    );
  }
}

export default Entities;