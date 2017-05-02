import React, { Component } from 'react';

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

export default Product;