import React, { Component } from 'react';

class CheckboxSet extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount () {
    this.selectedValues = new Set();
  }

  handleChange (event) {
    const value = event.target.value;

    if (this.selectedValues.has(value)) {
      this.selectedValues.delete(value);
    } else {
      this.selectedValues.add(value);
    }

    this.props.callBack(Array.from(this.selectedValues));
  }

  render () {    
    return (
      <form>
        {this.props.params.options.map((option) =>
          <p key={option.value} style={this.props.style}>
            <input type="checkbox" id={option.value} value={option.value} onChange={this.handleChange}/>
            <label htmlFor={option.value}>{option.placeholder}</label>
          </p>
        )}
      </form>
    );
  }
}

export default CheckboxSet;