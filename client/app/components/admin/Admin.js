import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getUserToken } from 'session';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from 'lib/components/PrivateRoute';
import LoginForm from './auth/LoginForm';
import AdminContentContainer from './AdminContentContainer';
import 'react-toastify/dist/ReactToastify.min.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchUserDetails } = this.props;
    if (getUserToken()) {
      fetchUserDetails();
    }
  }

  render() {
    return (
      <div className="bg-admin-bg-color overflow-auto admin">
        {!getUserToken() && <Redirect to="/admin/login" />}
        <Switch>
          <Route exact path="/admin/login" component={LoginForm} />
          <PrivateRoute
            isAuthenticated={getUserToken() !== null}
            path="/admin"
            redirectTo="/admin/login"
            component={AdminContentContainer}
          />
        </Switch>
        <ToastContainer autoClose={6000} position="top-right" />
      </div>
    );
  }
}

export default Admin;