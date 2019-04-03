/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Dropzone from 'react-dropzone';
import debounce from 'lodash.debounce';
import { haltEvent } from 'utils';

class NewTemplate extends Component {
  handleInputTyping = debounce((e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }, 500);

  constructor(props) {
    super(props);
    this.state = {
      template: null,
    };
  }

  onDrop = (acceptedFiles) => {
    this.setState({ template: acceptedFiles[0] });
  }

  handleSelect = option => {
    this.setState({ entity_id: option.value });
  }

  render() {
    const {
      entities,
      addNewTemplate,
    } = this.props;

    const { template } = this.state;

    if (entities.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="new-template">
        <div className="content-wrapper">
          <Dropzone accept=".zip" onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone-root mb-2 flex-column d-flex align-items-center justify-content-center" {...getRootProps()}>
                <input {...getInputProps()} />
                <div>Drop your archieve here in '.zip' format</div>
                <i className="icon ion-ios-cloud-download" />
                {template && (
                  <div className="d-flex">
                    <i className="text-green mr-1 ion-checkmark" />
                    <div className="text-small">{template.name}</div>
                  </div>
                )}
              </div>
            )}
          </Dropzone>

          <div className="form-group">
            <label htmlFor="name"> Name: * </label>
            <input
              className="form-control"
              id="name"
              name="name"
              onChange={e => this.handleInputTyping(e.nativeEvent)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description"> Description: </label>
            <input
              className="form-control"
              id="description"
              name="description"
              onChange={e => this.handleInputTyping(e.nativeEvent)}
            />
          </div>
          <button
            type="button"
            onClick={(e) => haltEvent(() => addNewTemplate(this.state), e)}
            className="btn w-100 btn-sm btn-primary"
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default NewTemplate;