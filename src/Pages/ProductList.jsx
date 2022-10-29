import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import './ProductList.css';
import { connect } from 'react-redux';
import trolley2 from '../images/trolley2.png';

const GET_PRODUCTS = gql`
  query getAll($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            symbol
            label
          }
          amount
        }
        brand
      }
    }
  }
`;

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      defaults: []
    };
  }
  //Quickshop(add products on cart) by clicking on trolley when hovering on products 
  addToCart(e, product) {
    e.preventDefault();
    let productAlreadyInCart = false;
    const cartItems = this.props.cartItems;
    //Get first values of attributes (key/value pair object) as defaults
    product.attributes.forEach((attr) => {
      let arr = this.state.defaults;
      arr[attr.id] = attr.items[0].value;
      this.setState({ defaults: arr });
    });
    cartItems?.forEach((item) => {
      if (item.id === product.id) {
        productAlreadyInCart = true;
      }
    });
    if (!productAlreadyInCart) {
      cartItems.push({
        ...product,
        count: 1,
        defaults: this.state.defaults,
        //For now, it's empty, if user selects attributes other than defaults, that chosen attributes will be pushed
        chosenAttributes: []
      });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return cartItems;
  }

  render() {
    return (
      <Query query={GET_PRODUCTS} variables={{ title: this.props.title }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error 🙁 </p>;
          return (
            <div className="wrapper">
              <div className="Category-name">{this.props.title}</div>
              <div className="ProductList" style={{ background: this.props.hover && 'rgba(57, 55, 72, 0.22)', overflow: 'hidden', zIndex: this.props.hover && '2'}}>
                {data.category.products.map((product) => {
                  return (
                    <Link
                      className="text-link"
                      to={`/productpage/${product.id}`}
                      key={product.id}
                      style={!product.inStock ? { opacity: 0.4, background: '#FFFFFF' } : { opacity: 1 }}
                    >
                      {!product.inStock && <div id="text">Out of stock</div>}
                      <img
                        src={product.gallery[0]}
                        style={{
                          background: this.props.hover && 'rgba(57, 55, 72, 0.22)'
                        }}
                        alt="Product-image"
                      ></img>
                      <div>{product.name}</div>
                      <div className="Product-price">
                        <div>
                          {(() => {
                            switch (true) {
                              case this.props.selectedValue === this.props.currency[0]:
                                return (
                                  <div>
                                    {product.prices[0].currency.symbol} <></>
                                    {product.prices[0].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[1]:
                                return (
                                  <div>
                                    {product.prices[1].currency.symbol} <></>
                                    {product.prices[1].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[2]:
                                return (
                                  <div>
                                    {product.prices[2].currency.symbol} <></>
                                    {product.prices[2].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[3]:
                                return (
                                  <div>
                                    {product.prices[3].currency.symbol} <></>
                                    {product.prices[3].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[4]:
                                return (
                                  <div>
                                    {product.prices[4].currency.symbol} <></>
                                    {product.prices[4].amount}
                                  </div>
                                );
                              default:
                                return (
                                  <div>
                                    {product.prices[0].currency.symbol} <></>
                                    {product.prices[0].amount}
                                  </div>
                                );
                            }
                          })()}
                        </div>
                      </div>
                      <button id="trolleyButton" onClick={(e) => this.addToCart(e, product)}>
                        <img src={trolley2} id="plptrolley" alt="add to cart"></img>
                      </button>
                    </Link>
                  );
                })}
                ;
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    selectedValue: state.selectedValue.selectedValue,
    hover: state.hover.hover
  };
};

export default connect(mapStateToProps)(ProductList);
