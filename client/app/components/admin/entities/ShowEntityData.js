import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { keys } from 'ramda';
import moment from 'moment-mini';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';

class ShowEntityData extends Component {
  constructor(props) {
    super(props);
    const { UIControls } = props.entity;
    const columnTypes = {};

    UIControls.forEach(ui_control => {
      columnTypes[ui_control.name] = ui_control.type;
    });

    this.state = {
      columnTypes,
      recordIdToDelete: null,
    };
  }

  componentDidMount() {
    const { fetchRecords } = this.props;
    fetchRecords();
  }

  componentDidUpdate(prevProps) {
    const {
      fetchRecords,
      match: { params: { entityId } },
    } = this.props;
    if (entityId !== prevProps.match.params.entityId) {
      fetchRecords();
    }
  }

  openModal = (recordId) => {
    this.setState({ recordIdToDelete: recordId });
  }

  closeModal = () => {
    this.setState({ recordIdToDelete: null });
  }

  render() {
    const {
      entities,
      entity,
      match: {
        params: {
          entityId,
        },
      },
    } = this.props;

    const { columnTypes, recordIdToDelete } = this.state;

    if (entities.loading || !entity.records) {
      return <LoadingSpinner />;
    }

    const NoData = (
      <div className="h-100 w-100 d-flex align-items-center justify-content-center"> No data associated with this entity </div>
    );

    console.log(this.props);

    return (
      <div className="w-100 show-entity-data">
        <Modal show={recordIdToDelete}>
          <ModalHeader closeModal={this.closeModal} />
          <div>
            <div>Are you sure you want to delete this record</div>
            <div className="d-flex mt-2 justify-content-center">
              <div onClick={this.closeModal} className="btn btn-gray-200 mr-2">No</div>
              <div onClick={() => { }} className="btn btn-danger">Yes</div>
            </div>
          </div>
        </Modal>

        <div className="action-bar d-flex align-items-center justify-content-between">
          <h4>{`${entity.name} Records`}</h4>

          <div>
            <Link to={`/admin/entities/${entityId}`} className="btn btn-gray-300 mr-1 btn-sm">View Entity</Link>
            <Link to={`/admin/entities/${entityId}/records/new`} className="btn btn-gray-300 btn-sm">Add Record</Link>
          </div>

        </div>
        {entity.records.length === 0 && NoData}
        <div className="container mt-4 table stripes">

          {/* Render header */}

          <div className="header row">
            {keys(entity.records[0]).map(key => {
              return <div key={key} className="col">{key}</div>;
            })}
            <div className="col" />
          </div>

          {/* Render rows */}

          {entity.records.map(record => {
            const allKeys = keys(record);
            return (
              <div key={record.id} className="row">
                {allKeys.map((key) => {
                  // Render columns
                  let value;
                  switch (columnTypes[key]) {
                    case 'date_input':
                      value = moment(record[key]).format('DD/MM/YYYY');
                      break;
                    case 'checkmark_input':
                      value = record[key].toString();
                      break;
                    default:
                      value = record[key];
                      break;
                  }
                  return (
                    <div className="col">
                      {value}
                    </div>
                  );
                })}
                <div className="col row-actions d-flex">
                  <Link className="text-gray-900" to={`/admin/entities/${entity.id}/records/edit/${record.id}`}>Edit</Link>
                  <div className="text-danger ml-1 cursor-pointer" onClick={() => this.openModal(record.id)}>Delete</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ShowEntityData;