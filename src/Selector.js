import React, { Component } from 'react';

class Selector extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.props.callBack(this.props.params.type, event.target.value);
  }

  render () {
    return (
      <div style={this.props.style}>
        {this.props.params.placeholder}: 
        <select onChange={this.handleChange}>
          {this.props.params.options.map((option) =>
            <option key={option.value} value={option.value}>{option.placeholder}</option>
          )}
        </select>
      </div>      
    );
  }
}

export default Selector;
