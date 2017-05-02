import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/App.css';
import Selector from './Selector';
import Filter from './Filter';
import Pagination from './Pagination';
import Product from './Product';

var axios = require('axios')

const styles = {

}
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      page: 1,
      view: 30,
      sort: 'none',
      category: [],
      price: 0,
      products: null,
      productType: 'multiple',
      links: null
    };
  }

  componentDidMount () {
    this.getMultipleProducts();
  }

  filter (type, value) {
    var updatedState = {};
    var self = this;
    updatedState[type] = value;
    if (type === 'view') {
      updatedState['page'] = 1;
    }
    this.setState(updatedState, function() {
      self.getMultipleProducts();
    });
  }

  getSingleProduct (id) {
    var self = this;
    var url = 'https://sephora-api-frontend-test.herokuapp.com/products/' + id;
    axios.get(url)
      .then(function (response) {
        self.setState({products: response.data.data, productType: 'single'});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMultipleProducts () {
    var self = this;
    var pageNumber = '?page[number]=' + this.state.page;
    var pageSize = '&page[size]=' + this.state.view;
    var sort = '';
    if (this.state.sort !== 'none') {
      sort = this.state.sort === 'lowToHigh' ? '&sort=price' : '&sort=-price';
    }
    var price = this.state.price > 0 ? '&filter[price_lt]=' + this.state.price : '';
    var category = '';
    if (this.state.category.length > 0) {
      var categories = this.state.category.join();
      category = this.state.category.length === 1 ? '&filter[category_eq]=' + categories : '&filter[category_in]=' + categories; 
    }
    var url = 'https://sephora-api-frontend-test.herokuapp.com/products' + pageNumber + pageSize + sort + price + category;
    console.log(url);
    axios.get(url)
      .then(function (response) {
        console.log('data', response);
        self.setState({products: response.data.data, productType: 'multiple', links: response.data.links});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render () {
    const pageParams = {
      type: 'page',
      links: this.state.links
    }

    const viewParams = {
      options: [
        {value: 30, placeholder: 30},
        {value: 60, placeholder: 60},
        {value: 120, placeholder: 120},
        {value: 240, placeholder: 240}
      ],
      type: 'view',
      placeholder: 'View'
    };
    const sortParams = {
      options: [
        {value: 'none', placeholder: 'None'},
        {value: 'lowToHigh', placeholder: 'Price: Low to High'},
        {value: 'highToLow', placeholder: 'Price: High to Low'}
      ],
      type: 'sort',
      placeholder: 'Price'
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
          <Product key={product.id} product={product} type={this.state.productType} callBack={()=>this.getSingleProduct(product.id)}/>
        )
      } else {
        productDisplay = <Product product={this.state.products} type={this.state.productType} callBack={()=>this.getMultipleProducts()}/>
      }
    }

    return (
      <div className="mainContainer">
        <div className="topContainer">
          <Pagination style={{padding: 20}} params={pageParams} callBack={(type, value)=>this.filter(type, value)}/>      
          <Selector style={{padding: 20}} params={viewParams} callBack={(type, value)=>this.filter(type, value)}/>      
        </div>
        <div className="bottomContainer">
          <div className="sideContainer">
            <Selector params={sortParams} callBack={(type, value)=>this.filter(type, value)}/>      
            <Filter params={categoryParams} callBack={(type, value)=>this.filter(type, value)}/>
            <Filter params={priceParams} callBack={(type, value)=>this.filter(type, value)}/>
          </div>
          <div className="contentContainer">
            {productDisplay}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
