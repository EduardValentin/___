import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';
import ActionBar from '../shared/ActionBar';
import NewTemplateContainer from './NewTemplateContainer';
import placeholder from 'assets/placeholder.jpg';

class TemplateIndex extends Component {
  static defaultProps = {
    deleteTemplate: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {
      newTemplateModalOpen: false,
    };
  }

  componentDidMount() {
    const { fetchTemplates } = this.props;
    fetchTemplates();
  }

  openModal = (id) => {
    this.setState({ openModal: id });
  }

  toggle = (prop) => () => {
    this.setState(prevState => ({ [prop]: !prevState[prop] }));
  }

  closeModal = () => {
    this.setState({ openModal: null });
  }

  render() {
    const {
      templates,
      deleteTemplate,
      entities,
    } = this.props;

    const { openModal, newTemplateModalOpen } = this.state;

    if (templates.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="templates-index">
        <ActionBar
          title="Templates"
          className="mb-4"
          buttons={[
            {
              text: 'Add template',
              type: 'button',
              bootstrapColor: 'primary',
              onClick: this.toggle('newTemplateModalOpen'),
            },
          ]}
        />
        <Modal show={openModal}>
          <ModalHeader closeModal={this.closeModal} />
          <div>
            <div>Are you sure you want to delete this template</div>
            <div className="d-flex mt-2 justify-content-center">
              <div onClick={this.closeModal} className="btn btn-gray-200 mr-2">No</div>
              <div onClick={() => {
                deleteTemplate(openModal);
                this.closeModal();
              }
              } className="btn btn-primary">Yes</div>
            </div>
          </div>
        </Modal>

        <Modal show={newTemplateModalOpen}>
          <ModalHeader closeModal={this.toggle('newTemplateModalOpen')} />
          <NewTemplateContainer />
        </Modal>

        {templates.data.map(template => {
          const entity = template.entity_id ? entities.data.find(entity => entity.id === template.entityId) : null;
          console.log(template);
          console.log(entity);


          return (
            <div key={template.id} className="template row p-3 mb-2 shadow">
              <div className="thumb col d-flex align-items-center mr-4">
                <img src={placeholder} alt="" />
              </div>
              <div className="info col-7">

                <div className="title">
                  <div className="text-bold">Name:</div>
                  <div>{template.name}</div>
                </div>

                <div className="description mt-2">
                  <div className="text-bold">Description:</div>
                  {template.description && <div>{template.description}</div>}
                  {!template.description && <div className="text-secondary text-small">No description</div>}
                </div>

                <div className="entity-info mt-2">
                  <div className="text-bold">Entity:</div>
                  {entity && <div>{entity.name}</div>}
                  {!entity && <div className="text-small">No entity associated with this template</div>}
                </div>
              </div>
              <div
                className="col icon cursor-pointer ml-auto d-flex justify-content-end align-items-center"
                onClick={() => this.openModal(template.id)}
              >
                <i onClick={() => openModal(template.id)} className="ion-trash-b text-gray" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TemplateIndex;