import React, { Component } from 'react';
import { isApplicationMaintainerLogged } from 'session';
import { Redirect } from 'react-router-dom';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!isApplicationMaintainerLogged()) {
      return <Redirect to="/admin/login" />;
    }

    return (
      <div>
        {'Admin'}
      </div>
    );
  }
}

export default Admin;