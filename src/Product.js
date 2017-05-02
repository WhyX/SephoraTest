import React, { Component } from 'react';

class Product extends Component {
  render () {
    const name = this.props.product.attributes.name;
    const category = this.props.product.attributes.category;
    const price = this.props.product.attributes.price / 100;
    const salePrice = this.props.product.attributes.sale_price / 100;
    return (
      <div style={this.props.style}>
        <div>
          <img src="https://placehold.it/230x150" alt="product"/>
        </div>
        <div>
          <p style={{fontWeight: 'bold'}}>{name}</p>
          <p style={{textTransform: 'capitalize'}}>{category}</p>
          <p style={{fontWeight: 'bold'}}>${price}</p>
          <p style={{fontWeight: 'bold'}}>Sale Price: ${salePrice}</p>
        </div>
      </div>
    );
  }
}

export default Product;