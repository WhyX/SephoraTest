import React, { Component } from 'react';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      options: props.params.options,
      selected: false,
      value: 0
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleVisibility (event) {
    this.setState({selected: !this.state.selected});
  }

  handleChange (event) {
    if (this.props.params.type === 'price') {
      this.setState({value: event.target.value});
    }
  }

  render () {
    const form = this.state.selected ? <form style={this.props.style}>
          {this.state.options.map((option) =>
            <p key={option.value} style={{paddingLeft: 10}}>
              {this.props.params.type === 'price' ? <input type={this.props.params.input} 
    id={option.value} checked={this.state.value == option.value} value={option.value} onChange={this.handleChange}/> : <input type={this.props.params.input} 
    id={option.value} value={option.value} onChange={this.handleChange}/>}
              <label htmlFor={option.value}>{option.placeholder}</label>
            </p>
          )}
        </form> : '';

        console.log(form);

    return (
      <div>
        <p>
          <input type="radio" id={this.props.params.type} checked={this.state.selected} onChange={this.toggleVisibility}/>
          <label htmlFor={this.props.params.type}>{this.props.params.placeholder}</label>
        </p>
        {form}
      </div>
    );
  }
}

export default Filter;