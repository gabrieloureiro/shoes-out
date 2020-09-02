import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';

import { ProductList, ProductCard } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = product => {
    const { addToCart } = this.props;

    addToCart(product);
  };

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(product => (
          <ProductCard
            key={product.id}
            className="container"
            bgCircle={product.color}
          >
            <div className="card">
              <div className="imgBx">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="contentBx">
                <h2>{product.title}</h2>
                <div className="size">
                  <h3>Size :</h3>
                  <span>37</span>
                  <span>38</span>
                  <span>39</span>
                  <span>40</span>
                </div>
                <div className="color">
                  <h3>Color :</h3>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="price">
                  <h3>Price :</h3>
                  <span>{product.priceFormatted}</span>
                </div>
                <button
                  type="button"
                  onClick={() => this.handleAddProduct(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </ProductCard>
        ))}
      </ProductList>
    );
  }
}

const mapDispatchProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchProps)(Home);
