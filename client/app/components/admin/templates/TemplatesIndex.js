import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';
import ActionBar from '../shared/ActionBar';

class TemplateIndex extends Component {
  static defaultProps = {
    deleteTemplate: () => { },
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchTemplates } = this.props;
    fetchTemplates();
  }

  openModal = (id) => {
    this.setState({ openModal: id });
  }

  closeModal = () => {
    this.setState({ openModal: null });
  }

  render() {
    const {
      templates,
      deleteTemplate,
    } = this.props;

    const { openModal } = this.state;

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
              type: 'link',
              link: '/admin/templates/new',
              bootstrapColor: 'primary',
            },
          ]}
        />
        {openModal && (
          <Modal show={openModal}>
            <ModalHeader closeModal={this.closeModal} />
            <div>
              <div>Are you sure you want to delete this template</div>
              <div className="d-flex mt-2 justify-content-center">
                <div onClick={this.closeModal} className="btn btn-gray-200 mr-2">No</div>
                <div onClick={() => deleteTemplate(id)} className="btn btn-primary">Yes</div>
              </div>
            </div>
          </Modal>
        )}
        {templates.data.map(template => {
          return (
            <div key={template.id} className="template d-flex align-items-center p-3 mb-2 shadow">
              <div className="thumb mr-2">Thumbnail here</div>
              <div className="info w-100">
                <div className="title">{template.name}</div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div className="description">
                    {template.description}
                  </div>
                  <div
                    className="icon cursor-pointer d-flex justify-content-between align-items-center"
                    onClick={() => this.openModal(template.id)}
                  >
                    <i className="ion-trash-b text-gray" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default TemplateIndex;