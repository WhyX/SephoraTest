import React, { Component } from 'react';
import './css/Pagination.css'

class Pagination extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    const value = parseInt(event.target.value, 10);
    this.props.callBack(this.props.params.type, value);
  }

  getParameterByName(name, url) {
    url = decodeURIComponent(url);
    const pattern = new RegExp('[\\[\\]]', 'g')
    name = name.replace(pattern, "\\$&");

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

      prev = prev === null ? '' : <button value={prev} id="prev_btn" className="pageButton" onClick={this.handleChange}>◀</button>;
      next = next === null ? '' : <button value={next} id="next_btn" className="pageButton" onClick={this.handleChange}>▶</button>;
      first = first === null ? '' : <button value={first} id="first_btn" className="pageButton" onClick={this.handleChange}>First</button>;
      last = last === null ? '' : <button value={last} id="last_btn" className="pageButton" onClick={this.handleChange}>Last</button>;
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
