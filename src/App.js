import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Selector from './Selector';
import Filter from './Filter';
import Product from './Product';
var axios = require('axios')

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 1,
      size: 30,
      sort: 'none',
      category: 'all',
      price: 0,
      products: null,
      productType: 'multiple'
    };
  }

  componentDidMount () {
    this.getMultipleProducts();
  }

  getSingleProduct (id) {
    var self = this;
    var url = 'https://sephora-api-frontend-test.herokuapp.com/products/' + id;
    axios.get(url)
      .then(function (response) {
        console.log('data', response);
        self.setState({products: response.data.data, productType: 'single'});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMultipleProducts () {
    var self = this;
    var pageNumber = '?page[number]=' + this.state.page;
    var pageSize = '&page[size]=' + this.state.size;
    var url = 'https://sephora-api-frontend-test.herokuapp.com/products' + pageNumber + pageSize;
    axios.get(url)
      .then(function (response) {
        console.log('data', response);
        self.setState({products: response.data.data, productType: 'multiple'});
      })
      .catch(function (error) {
        console.log(error);
      });
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

    var productDisplay;

    if (this.state.products !== null) {
      if (this.state.productType === 'multiple') {
          productDisplay = this.state.products.map((product) =>
          <Product key={product.id} style={{width: 250, textAlign: 'center', marginBottom: 15}} product={product} type={this.state.productType} callBack={()=>this.getSingleProduct(product.id)}/>
        )
      } else {
        console.log('single product:', this.state.products);
        productDisplay = <Product style={{width: 250, textAlign: 'center', marginBottom: 15}} product={this.state.products} type={this.state.productType} callBack={()=>this.getMultipleProducts()}/>
      }
    }

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
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {productDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
