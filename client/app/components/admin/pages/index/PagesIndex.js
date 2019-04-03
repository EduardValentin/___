import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import ActionBar from 'components/admin/shared/ActionBar';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';
import DeleteModal from 'components/admin/shared/DeleteModal';
import NewPageContainer from '../create/NewPageContainer';

export default class PagesIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPageModal: null,
      editModal: null,  // will contain the id of the page
      deleteModal: null,  // will contain the id of the page
    };
  }

  openModal = (modalName, id) => {
    this.setState({ [modalName]: id || true });
  }

  closeModal = (modalName) => {
    this.setState({ [modalName]: null });
  }

  getInitialValues = (pageId) => {
    const { pages, entities } = this.props;
    const page = pages.data.find(pg => pg.id === pageId);

    const initialValues = { ...page, Entities: [] };
    page.Entities.forEach(entity => {
      const storeEntity = entities.data.find(se => se.id === entity.id);
      initialValues.Entities.push({ value: storeEntity.id, label: storeEntity.name });
    });

    return initialValues;
  }

  render() {
    const {
      pages,
      entities,
      deletePage,
    } = this.props;

    const { newPageModal, deleteModal, editModal } = this.state;
    console.log(pages);

    if (pages.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="pages-index">
        <Modal
          className="add-page-modal"
          show={newPageModal}
        >
          <ModalHeader closeModal={() => this.closeModal('newPageModal')} />
          <NewPageContainer closeModal={() => this.closeModal('newPageModal')} />
        </Modal>

        <Modal
          className="add-page-modal"
          show={editModal}
        >
          <ModalHeader closeModal={() => this.closeModal('editModal')} />
          <NewPageContainer
            getInitialValues={() => this.getInitialValues(editModal)}
            closeModal={() => this.closeModal('editModal')}
            edit
          />
        </Modal>

        <DeleteModal
          isOpen={deleteModal}
          closeModal={() => this.closeModal('deleteModal')}
          message="Are you sure you want to delete this page ?"
          onYesClick={() => deletePage(deleteModal)}
        />

        <ActionBar
          title="Pages"
          buttons={[
            {
              type: 'button',
              text: 'New page',
              onClick: () => this.openModal('newPageModal'),
              bootstrapColor: 'primary',
            },
          ]}
        />

        <div>
          {pages.data.map(page => {
            return (
              <div className="page-row d-flex justify-content-between align-items-center mb-2 p-2">
                <div>
                  <div className="d-flex mb-1 align-items-center">
                    <div className="page-label">{page.label}</div>
                    <div className="p-link text-small text-secondary ml-2">{page.link}</div>
                  </div>
                  <div className="entities d-flex flex-wrap">
                    {page.Entities.map(pageEntity => {
                      const entity = entities.data.find(ent => ent.id === pageEntity.id);
                      return (
                        <div className="badge badge-pill mr-2 badge-primary">{entity.name}</div>
                      );
                    })}
                  </div>
                </div>
                <div className="actions text-right">
                  <div className="icon">
                    <i className="ion-trash-b" onClick={() => this.openModal('deleteModal', page.id)} />
                  </div>
                  <div className="icon">
                    <i className="icon ion-ios-compose" onClick={() => this.openModal('editModal', page.id)} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
