import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class Datepicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSelectDate = (date) => {
    const { onChange = () => { } } = this.props;
    onChange(date);
  }

  render() {
    const { name, value } = this.props;
    return (
      <div className="form-group">
        <label className="d-block" htmlFor={name}>{name}</label>
        <DatePicker
          {...this.props}
          className="form-control w-100"
          id={name}
          onChange={this.handleSelectDate}
          selected={value}
        />
      </div>
    );
  }
}

export default Datepicker;