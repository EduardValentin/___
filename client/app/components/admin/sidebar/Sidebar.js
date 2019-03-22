import React, { Component } from 'react';
import classNames from 'classnames';
import { NavLink, Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';

const ArrowIcon = ({ className, onClick, direction = 'down' }) => (
  <i
    onClick={onClick}
    className={classNames(className, `text-white ion-chevron-${direction} cursor-pointer`)}
  />
);

class Sidebar extends Component {
  static defaultProps = {
    routes: [],
  }

  constructor(props) {
    super(props);
    const openedSubMenus = {};

    props.routes.forEach(route => {
      if (route.subLinks) {
        openedSubMenus[route.path] = false;
      }
    });

    this.state = {
      openedSubMenus,
    };
  }

  toggleSubMenu = (routeName) => {
    this.setState(prevState => ({
      ...prevState,
      openedSubMenus: {
        ...prevState.openedSubMenus,
        [routeName]: !prevState.openedSubMenus[routeName],
      },
    }));
  }

  render() {
    const {
      className,
      routes,
      isExpanded,
      toggleSidebar,
    } = this.props;

    const {
      openedSubMenus,
    } = this.state;

    const togglerClass = {
      'ion-android-arrow-forward': isExpanded,
      'ion-android-arrow-back': !isExpanded,
    };

    return (
      <div className={classNames(className, 'sidebar px-2 text-gray-500')}>

        <i onClick={toggleSidebar} className={classNames(togglerClass, 'cursor-pointer ml-auto toggler')} />

        {isExpanded && (
          <Link
            className="add-entity border border-gray-500 my-2 py-1 text-center w-100 d-block"
            to="/admin/entities/new"
          >
            {'Add Entity'}
          </Link>
        )}

        {!isExpanded && (
          <Link
            className="d-block text-right my-2 add-entity"
            to="/admin/entities/new"
          >
            <i className="ion-ios-plus-empty" />
          </Link>
        )}

        {routes.map(route => {
          return (
            <div key={route.path}>
              <div className="link d-flex">
                <NavLink
                  activeClassName="active"
                  className="py-1"
                  to={route.path}
                >
                  {route.icon}
                  <span className="route-name">
                    {route.name}
                  </span>
                </NavLink>

                {route.subLinks && (
                  <ArrowIcon
                    className="arrow"
                    direction={openedSubMenus[route.name] === true ? 'up' : 'down'}
                    onClick={() => this.toggleSubMenu(route.name)}
                  />
                )}
              </div>

              {route.subLinks && (
                <Collapse isOpen={openedSubMenus[route.name]}>
                  <div className="sub-links">
                    {route.subLinks.map(link => {
                      return (
                        <NavLink
                          key={link.path}
                          activeClassName="active"
                          className="d-block px-2 ml-2"
                          to={link.path}
                        >
                          {link.name}
                        </NavLink>
                      );
                    })}
                  </div>
                </Collapse>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}


export default Sidebar;