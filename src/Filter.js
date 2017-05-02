import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      options: props.params.options,
      selected: false
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  toggleVisibility (event) {
    this.setState({selected: !this.state.selected});
  }

  render () {
    return (
      <div>
        <p>
          <input type="radio" id={this.props.params.type} checked={this.state.selected} onChange={this.toggleVisibility}/>
          <label htmlFor={this.props.params.type}>{this.props.params.placeholder}</label>
        </p>
        <form style={this.props.style}>
          {this.state.options.map((option) =>
            <p key={option.value}>
              <input type={this.props.params.input} id={option.value} value={option.value}/>
              <label htmlFor={option.value}>{option.placeholder}</label>
            </p>
          )}
        </form>
      </div>
    );
  }
}

export default Filter;