import React, { Component } from 'react';

class RadioSet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({value: event.target.value});
    this.props.callBack(event.target.value);
  }

  render () {
    return (
      <form>
        {this.props.params.options.map((option) =>
          <p key={option.value} style={this.props.style}>
            <input type="radio" id={option.value} checked={parseInt(this.state.value, 10) === parseInt(option.value, 10)} 
            value={option.value} onChange={this.handleChange}/> 
            <label htmlFor={option.value}>{option.placeholder}</label>
          </p>
        )}
      </form>
    );
  }
}

export default RadioSet;