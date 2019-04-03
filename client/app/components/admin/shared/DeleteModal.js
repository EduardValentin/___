import React, { memo } from 'react';
import Modal from 'lib/components/modal/Modal';
import ModalHeader from 'lib/components/modal/ModalHeader';

const DeleteModal = memo(({
  closeModal,
  isOpen,
  onYesClick,
  onNoClick,
  message,
}) => {
  return (
    <Modal show={isOpen}>
      <ModalHeader closeModal={closeModal} />
      <div>
        <div>{message}</div>
        <div className="d-flex mt-2 justify-content-center">
          <div
            onClick={() => {
              onNoClick();
              closeModal();
            }}
            className="btn btn-gray-200 mr-2"
          >
            No
          </div>
          <div
            onClick={() => {
              onYesClick();
              closeModal();
            }}
            className="btn btn-primary"
          >
            Yes
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default DeleteModal;