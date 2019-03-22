import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import Dropzone from 'react-dropzone';

class NewTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({ file: acceptedFiles[0] });
  }

  render() {
    const {
      entities,
    } = this.props;

    const { file } = this.state;

    if (entities.loading) {
      return <LoadingSpinner />;
    }

    return (
      <div className="new-template">
        <span>Content here</span>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropzone-root" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default NewTemplate;