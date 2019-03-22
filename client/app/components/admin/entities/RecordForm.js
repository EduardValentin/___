import React, { Component } from 'react';
import LoadingSpinner from 'lib/components/LoadingSpinner';
import { dissoc } from 'ramda';
import UiControl from './ui_control/UiControl';


class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { match: { params }, fetchRecords } = this.props;
    if (params.action === 'edit') {
      fetchRecords();
    }
  }

  componentDidUpdate(prevProps) {
    const { match: { params }, entity } = this.props;
    if (params.action === 'edit' && entity.records !== prevProps.entity.records) {
      const thisRecord = entity.records.find(record => record.id.toString() === params.recordId);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...dissoc('id', thisRecord) });
    }
  }

  setRecordValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      entity,
      entities,
      handleSubmit,
    } = this.props;

    if (entities.loading) {
      return <LoadingSpinner />;
    }
    console.log(this.state);

    return (
      <div className="w-100">
        <div className="w-50">
          {entity.UIControls.map(ui_control => {
            const controlName = ui_control.name.toLowerCase();
            // eslint-disable-next-line react/destructuring-assignment
            const value = this.state[controlName];
            return (
              <UiControl
                key={ui_control.id}
                onChange={(value => this.setRecordValue(controlName, value))}
                value={value}
                {...ui_control}
              />
            );
          })}
          <div onClick={() => handleSubmit(this.state)} className="btn btn-sm btn-primary">Send</div>
        </div>
      </div>
    );
  }
}

export default RecordForm;