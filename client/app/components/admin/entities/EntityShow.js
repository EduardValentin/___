import React, { Component } from 'react';
import find from 'ramda/es/find';
import LoadingSpinner from 'lib/components/LoadingSpinner';

class EntityShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchEntity } = this.props;
    fetchEntity();
  }

  render() {
    const {
      match: { params: { entityId } },
      entities,
    } = this.props;

    const thisEntity = find(entity => entity.id === parseInt(entityId, 10), entities.data);

    if (entities.loading || thisEntity.loading) {
      return <LoadingSpinner />;
    }


    console.log(thisEntity);

    return (
      <div className="entity-show w-100">
        <div className="action-bar w-100 d-flex justify-content-between">
          <div>{thisEntity.name}</div>

          <div>
            <div className="btn btn-gray-200 mr-2">Edit</div>
            <div className="btn btn-danger">Delete</div>
          </div>
        </div>
        <h4>Fields:</h4>
      </div>
    );
  }
}

export default EntityShow;