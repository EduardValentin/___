import React, { PureComponent } from 'react';
import { Collapse } from 'reactstrap';
import classnames from 'classnames';

class GroupsSidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openGroups: {}, // hash containing ids of the open groups
    };
  }

  toggleGroup = id => {
    this.setState(prevState => ({
      openGroups: {
        ...prevState.openGroups,
        [id]: !prevState.openGroups[id],
      },
    }));
  }

  renderDirectories = (dir) => {
    const { mediaGroups, onGroupClick = () => {} } = this.props;
    const { openGroups } = this.state;

    const chevronDirection = {
      'ion-chevron-down': !openGroups[dir.id],
      'ion-chevron-up': openGroups[dir.id],
      'd-none': !dir.MediaGroups.length,
    };

    return (
      <div className="directory">
        <div className="dir-row d-flex align-items-center">
          <div
            className="group cursor-pointer d-flex align-items-center"
            onClick={() => onGroupClick(dir)}
          >
            <i className="ion-ios-folder mr-2 icon-big" />
            <div className="dir-name">{dir.name}</div>
          </div>
          <i
            className={classnames(chevronDirection, 'ml-2 cursor-pointer')}
            onClick={() => this.toggleGroup(dir.id)}
          />
        </div>
        <Collapse isOpen={openGroups[dir.id]}>
          {dir.MediaGroups.length !== 0 && (
            <div className="sub-directories pl-2">
              {dir.MediaGroups.map(subDir => {
                // find media group in store
                const group = mediaGroups.data.find(store_group => store_group.id === subDir.id);
                return this.renderDirectories(group);
              })}
            </div>
          )}
        </Collapse>

      </div>
    );
  }

  render() {
    const { mediaGroups, className } = this.props;

    return (
      <div className={classnames(className, 'media-groups')}>
        {mediaGroups.data.map(mgroup => {
          if (!mgroup.parent_id) {
            return this.renderDirectories(mgroup);
          }
          return null;
        })}
      </div>
    );
  }
}

export default GroupsSidebar;