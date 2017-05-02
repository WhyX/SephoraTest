import React, { Component } from 'react';

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
      salePriceDisplay = <p style={{margin: 0, fontWeight: 'bold'}}>Sale Price: ${salePrice}</p>;
      if (this.props.product.attributes.under_sale) {
        availabilityDisplay = this.props.product.attributes.sold_out ? <p style={{margin: 0, fontWeight: 'bold', color: 'red'}}>Out of Stock</p> : <p style={{margin: 0, fontWeight: 'bold', color: 'green'}}>Available</p>;
      } else {
        availabilityDisplay = <p style={{margin: 0, fontWeight: 'bold', color: 'darkgrey'}}>Not for Sale</p>;
      }
    }

    return (
      <div style={this.props.style}>
        <div>
          <button style={{position: 'absolute', border: 'none', backgroundColor: 'white', cursor: 'pointer'}} onClick={this.props.callBack}>{buttonPlaceholder}</button>
          <img src="https://placehold.it/230x150" alt="product"/>
        </div>
        <div>
          <p style={{margin: 0, fontWeight: 'bold'}}>{name}</p>
          <p style={{margin: 0, textTransform: 'capitalize'}}>{category}</p>
          <p style={{margin: 0, fontWeight: 'bold'}}>${price}</p>
          {salePriceDisplay}
          {availabilityDisplay}
        </div>
      </div>
    );
  }
}

export default Product;