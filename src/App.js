import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Selector from './Selector';
import Filter from './Filter';
import Product from './Product';

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
