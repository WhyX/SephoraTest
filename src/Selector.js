import React, { Component } from 'react';

class Selector extends Component {
  constructor (props) {
    super(props);
    this.state = {
      options: props.params.options
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    console.log(event.target.value);
  }

  render () {
    return (
      <div style={this.props.style}>
        {this.props.params.type}: 
        <select>
          {this.state.options.map((option) =>
            <option key={option.value} value={option.value}>{option.placeholder}</option>
          )}
        </select>
      </div>      
    );
  }
}

export default Selector;
