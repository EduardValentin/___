import React, { Component } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

class Modal extends Component {
  render() {
    const { children, show, className } = this.props;
    if (!show) {
      return null;
    }
    return ReactDOM.createPortal(
      <div className={classnames('modal d-flex justify-content-center flex-column align-items-center', className)}>
        <div className="p-4 content">
          {children}
        </div>
      </div>,
      document.body,
    );
  }
}

Modal.defaultProps = {
  children: () => <div>Modal content missing</div>,
};

export default Modal;
