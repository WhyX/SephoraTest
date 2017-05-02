import React, { Component } from 'react';
import './css/Product.css';

class Product extends Component {
  render () {
    const name = this.props.product.attributes.name;
    const category = this.props.product.attributes.category;
    const price = this.props.product.attributes.price / 100;
    const buttonPlaceholder = this.props.type === 'single' ? 'X' : 'View';
    var salePriceDisplay;
    var availabilityDisplay;

    if (this.props.type === 'single') {
      const salePrice = this.props.product.attributes.sale_price / 100;
      salePriceDisplay = <p>Sale Price: ${salePrice}</p>;
      if (this.props.product.attributes.under_sale) {
        availabilityDisplay = this.props.product.attributes.sold_out ? <p style={{color: 'red'}}>Out of Stock</p> : <p style={{color: 'green'}}>Available</p>;
      } else {
        availabilityDisplay = <p style={{color: 'darkgrey'}}>Not for Sell</p>;
      }
    }

    return (
      <div className="product">
        <div>
          <button className="viewButton" onClick={this.props.callBack}>{buttonPlaceholder}</button>
          <img src="https://placehold.it/230x150" alt="product"/>
        </div>
        <div>
          <p>{name}</p>
          <p style={{fontWeight: 'normal', textTransform: 'capitalize'}}>{category}</p>
          <p>${price}</p>
          {salePriceDisplay}
          {availabilityDisplay}
        </div>
      </div>
    );
  }
}

export default Product;