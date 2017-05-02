import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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

class Paginate extends Component {

}

class Products extends Component {
  render () {
    const datas = [
    {id: 0, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 1, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 2, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 3, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 4, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 5, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 6, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 7, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 8, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 9, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 10, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    {id: 11, name: 'testA', category: 'catA', price: 3.77, salePrice: 13.77},
    ];
    return (
      <div style={this.props.style}>
      {datas.map((data) =>
        <Product key={data.id} style={{width: 250, textAlign: 'center', marginBottom: 10}} product={data}/>
      )}
      </div>
    );
  };
}

class Product extends Component {
  render () {
    return (
      <div style={this.props.style}>
        <div>
          <img src="https://placehold.it/230x150" alt="product"/>
        </div>
        <div>
          <p style={{fontWeight: 'bold'}}>{this.props.product.name}</p>
          <p style={{textTransform: 'capitalize'}}>{this.props.product.category}</p>
          <p style={{fontWeight: 'bold'}}>${this.props.product.price}</p>
          <p style={{fontWeight: 'bold'}}>Sale Price: ${this.props.product.salePrice}</p>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      view: 30,
      sort: 'none',
      category: 'all',
      price: 0
    };
  }

  render () {
    const viewParams = {
      options: [
        {value: 30, placeholder: 30},
        {value: 60, placeholder: 60},
        {value: 120, placeholder: 120},
        {value: 240, placeholder: 240}
      ],
      type: 'View'
    };
    const sortParams = {
      options: [
        {value: 'none', placeholder: 'None'},
        {value: 'lowToHigh', placeholder: 'Price: Low to High'},
        {value: 'highToLow', placeholder: 'Price: High to Low'}
      ],
      type: 'Sort'
    };
    const categoryParams = {
      options: [
        {value: 'brushes', placeholder: 'Brushes'},
        {value: 'tools', placeholder: 'Tools'},
        {value: 'markup', placeholder: 'Markup'}
      ],
      input: 'checkbox',
      type: 'category',
      placeholder: 'Category'
    };
    const priceParams = {
      options: [
        {value: 1500, placeholder: 'Under $15'},
        {value: 3000, placeholder: 'Under $30'},
        {value: 5000, placeholder: 'Under $50'},
        {value: 10000, placeholder: 'Under $100'},
        {value: 25000, placeholder: 'Under $250'},
        {value: 100000, placeholder: 'Under $1000'}
      ],
      input: 'radio',
      type: 'price',
      placeholder: 'Price'
    };
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{minHeight: 80, display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Selector style={{padding: 20}} params={viewParams}/>      
        </div>
        <div style={{display: 'flex'}}>
          <div style={{maxWidth: 150, padding: 15}}>
            <Selector params={sortParams}/>      
            <Filter params={categoryParams}/>
            <Filter params={priceParams}/>
          </div>
          <Products style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}/>
        </div>
      </div>
    );
  }
}

export default App;
