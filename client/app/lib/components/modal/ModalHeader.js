import React, { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ModalHeader = memo(({
  children,
  className,
  closeModal,
  closeButton,
}) => {
  return (
    <div className={classnames(className, 'custom-modal-header no-gutters row justify-content-between')}>
      {children}
      <div />
      <div
        className="close-btn col-1 text-right cursor-pointer"
        onClick={closeModal}
      >
        {closeButton}
      </div>
    </div>
  );
});

ModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

ModalHeader.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  closeButton: (
    <div className="font-size-25 line-height-25">
      <i className="ion-close" />
    </div>
  ),
};

export default ModalHeader;
