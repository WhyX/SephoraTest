import React, { Component } from 'react';

class Pagination extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    console.log('value', event.target.value);
    this.props.callBack(this.props.params.type, event.target.value);
  }

  getParameterByName(name, url) {
    url = decodeURIComponent(url);
    name = name.replace(/[\[\]]/g, "\\$&");

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  render () {
    var curr = 1;
    var last, next, prev, first;
    if (this.props.params.links !== null) {
      curr = this.props.params.links.self !== undefined ? this.getParameterByName('page[number]', this.props.params.links.self) : curr;
      first = this.props.params.links.first !== undefined ? this.getParameterByName('page[number]', this.props.params.links.first) : null;
      last = this.props.params.links.last !== undefined ? this.getParameterByName('page[number]', this.props.params.links.last) : null;
      next = this.props.params.links.next !== undefined ? this.getParameterByName('page[number]', this.props.params.links.next) : null;
      prev = this.props.params.links.prev !== undefined ? this.getParameterByName('page[number]', this.props.params.links.prev) : null;

      prev = prev === null ? '' : <button value={prev} style={{fontSize: 15, cursor: 'pointer', marginLeft: 5, marginRight: 5, background: 'white', border: 'none'}} onClick={this.handleChange}>◀</button>;
      next = next === null ? '' : <button value={next} style={{fontSize: 15, cursor: 'pointer', marginLeft: 5, marginRight: 5, background: 'white', border: 'none'}} onClick={this.handleChange}>▶</button>;
      first = first === null ? '' : <button value={first} style={{fontSize: 15, cursor: 'pointer', marginLeft: 5, marginRight: 5, background: 'white', border: 'none'}} onClick={this.handleChange}>First</button>;
      last = last === null ? '' : <button value={last} style={{fontSize: 15, cursor: 'pointer', marginLeft: 5, marginRight: 5, background: 'white', border: 'none'}} onClick={this.handleChange}>Last</button>;
    }

    return (
      <div style={this.props.style}>
        {first}
        {prev}
        {curr}
        {next}
        {last}
      </div>      
    );
  }
}

export default Pagination;
