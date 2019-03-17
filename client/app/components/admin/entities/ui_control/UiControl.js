import React, { Component } from 'react';
import Checkbox from 'lib/forms/Checkbox';
import Datepicker from 'lib/forms/Datepicker';
import Input from 'lib/forms/Input';

class UiControl extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, value } = this.props;
    if (type === 'text_input') {
      const { name, onChange, ...rest } = this.props;
      return (
        <Input
          {...rest}
          input={{
            name,
            value,
            onChange: (e) => {
              const { value } = e.target;
              onChange(value);
            },
          }}
          label={name}
        />
      );
    }

    if (type === 'checkmark_input') {
      const { name, onChange, ...rest } = this.props;
      return (
        <Checkbox
          {...rest}
          label={name}
          value={value}
          onChange={e => onChange(e.target.checked)}
        />
      );
    }

    return <Datepicker value={value} {...this.props} />;
  }
}

export default UiControl;