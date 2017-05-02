import React, { Component } from 'react';
import RadioSet from './RadioSet';
import CheckboxSet from './CheckboxSet';

class Filter extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selected: false,
    };

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleVisibility (event) {
    this.setState({selected: !this.state.selected});
  }

  handleChange (value) {
    this.props.callBack(this.props.params.type, value);
  }

  render () {
    var form = '';
    if (this.state.selected) {
      form = this.props.params.type === 'price' ? <RadioSet params={this.props.params} callBack={(value)=>this.handleChange(value)}/> : 
          <CheckboxSet params={this.props.params} callBack={(value)=>this.handleChange(value)}/>;
    }

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