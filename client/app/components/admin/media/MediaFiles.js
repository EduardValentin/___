import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import GroupsSidebar from './GroupsSidebar';

class MediaFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  render() {
    const { media_groups } = this.props;

    if (media_groups.loading) {
      return <LoadingSpinner />;
    }

    console.log(media_groups);

    return (
      <div className="media-page">
        <div className="row">
          <GroupsSidebar
            className="col-3"
            mediaGroups={media_groups}
          />
          <div className="col">
            images here
          </div>
        </div>
      </div>
    );
  }
}

export default MediaFiles;