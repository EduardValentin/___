import React, { Component } from 'react';
import { getUserToken } from 'session';
import { Redirect, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
// import LoadingSpinner from 'lib/components/LoadingSpinner';
import EntitiesContainer from './entities/EntitiesContainer';
import ProfilleContainer from './profille/ProfilleContainer';
import SettingsContainer from './settings/SettingsContainer';
import SidebarContainer from './sidebar/SidebarContainer';

class AdminContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarExpanded: true,
    };
  }

  componentDidMount() {
    const { fetchEntities } = this.props;
    fetchEntities();
  }

  toggle = prop => () => this.setState(prevState => ({
    [prop]: !prevState[prop],
  }));

  render() {
    const {
      sidebarExpanded,
    } = this.state;

    const {
      entities,
    } = this.props;

    const sidebarClasses = {
      expanded: sidebarExpanded,
      collapsed: !sidebarExpanded,
    };

    if (!entities.data || entities.loading) {
      return null;
    }

    const routes = [{
      name: 'Templates',
      path: '/admin/templates',
    },
    {
      name: 'Articles',
      path: '/admin/articles',
    },
    {
      name: 'Entities',
      path: '/admin/entities',
      subLinks: entities.data.map(entity => {
        return {
          name: entity.name,
          path: `/admin/entities/${entity.id}/records`,
        };
      }),
    }];

    return (
      <div className="admin-content">
        <SidebarContainer
          routes={routes}
          isExpanded={sidebarExpanded}
          className={classNames(sidebarClasses)}
          toggleSidebar={this.toggle('sidebarExpanded')}
        />
        {!getUserToken() && <Redirect to="/admin/login" />}
        <div className={classNames(sidebarClasses, 'content p-2 h-100')}>
          <Switch>
            {/* TODO: Change to private routes */}
            <Route exact path="/admin/profille" component={ProfilleContainer} />
            <Route path="/admin/entities" component={EntitiesContainer} />
            <Route exact path="/admin/settings" component={SettingsContainer} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default AdminContent;