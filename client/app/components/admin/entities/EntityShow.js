import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';
import { Link } from 'react-router-dom';

class EntityShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalOpen: false,
    };
  }

  toggle = prop => () => {
    this.setState(prevState => ({
      [prop]: !prevState[prop],
    }));
  }

  // handleSelect = (opt, fieldId) => {
  //   this.addAction({
  //     on: fieldId,
  //     action: 'modify',
  //     type: opt.value,
  //   });
  // }


  render() {
    const {
      entity,
      deleteEntity,
      match: {
        params: {
          entityId,
        },
      },
    } = this.props;

    const { deleteModalOpen } = this.state;

    if (!entity || !entity.UIControls) {
      return <LoadingSpinner />;
    }

    return (
      <div className="entity-show w-100">
        <Modal show={deleteModalOpen}>
          <ModalHeader closeModal={this.toggle('deleteModalOpen')} />
          <div>
            <div>Are you sure you want to delete the entity</div>
            <div className="d-flex mt-2 justify-content-center">
              <div onClick={this.toggle('deleteModalOpen')} className="btn btn-gray-200 mr-2">No</div>
              <div onClick={deleteEntity} className="btn btn-danger">Yes</div>
            </div>
          </div>
        </Modal>

        <div className="action-bar mb-4 w-100 d-flex justify-content-between">
          <h3 className="text-black">{entity.name}</h3>

          <div>
            <Link to={`/admin/entities/${entityId}/edit`} className="btn btn-gray-200 mr-2">Edit</Link>
            <div onClick={this.toggle('deleteModalOpen')} className="btn btn-danger">Delete</div>
          </div>
        </div>

        {entity.UIControls.map(field => {
          return (
            <div className="row py-2 stripes">
              <div className="col">
                <div>Name:</div>
                <div>{field.name}</div>
              </div>

              <div className="col">
                <div>Type:</div>
                <div>{field.type}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default EntityShow;