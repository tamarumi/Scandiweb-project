import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import './ProductPage.css';
import '../App.css';
import { connect } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
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
`;

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      isActive: false,
      attribute: '',
      array: [],
    };
  }

  componentDidMount() {
    this.setState({
      id: window.location.pathname.split('/')[2],
    });
  }
  //Responsible to select/add the clicked attribute in "chosen attributes(chosenAttributes)"
  makeActive(e, attr) {
    e.preventDefault();
    let et = e.currentTarget.textContent.trim() || e.currentTarget.value.trim();
    let arr = this.state.array;
    arr[attr] = et;
    this.setState({ array: arr });
  }

  addToCart(e, product) {
    e.preventDefault();
    let productAlreadyInCart = false;
    let validated = true;
    //If every attribute is chosen and added to chosenAttributes, make it validated and add a product to cart
    product.attributes.forEach((a) => (this.state.array[a.id] ? '' : (validated = false)));
    if (validated) {
      this.setState((state, props) => {
        const cartItems = this.props.cartItems;
        cartItems?.forEach((item) => {
          if (item.id === product.id) {
            productAlreadyInCart = true;
          }
        });
        if (!productAlreadyInCart) {
          cartItems.push({
            ...product,
            count: 1,
            chosenAttributes: this.state.array,
          });
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return cartItems;
      });
    } else {
      alert('Please choose all desirable attributes first!');
    }
  }

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.state.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.toString()} </p>;
          return (
            <div>
              <ErrorBoundary>
                <div
                  className="ppWrapper"
                  style={{
                    background: this.props.hover && 'rgba(57, 55, 72, 0.22)',
                    overflow: 'hidden',
                    zIndex: this.props.hover && '0',
                  }}
                >
                  <div className="Product">
                    {data.product.gallery.length > 1 && (
                      <div className="images">
                        <img src={data.product.gallery[1]} alt="image1" />
                        <img src={data.product.gallery[2]} alt="image2" />
                        <img src={data.product.gallery[3]} alt="image3" />
                        <img src={data.product.gallery[4]} alt="image4" />
                      </div>
                    )}
                  </div>
                  <div className="Product-image">
                    <img src={data.product.gallery[0]} alt="main-image" />
                    <div className="Product-content">
                      <h1 id="brand">{data.product.brand}</h1>
                      <h2 id="name">{data.product.name}</h2>

                      {data.product.attributes?.map((attr) => (
                        <div className={['Size', 'Color'].includes(attr.id) ? attr.id + '-buttons' : 'OtherAttributes'} key={attr.id}>
                          <div>{attr.name}:</div>
                          {attr.items.map((attrItem) => (
                            <button
                              key={attrItem.id}
                              onClick={(e) => this.makeActive(e, attr.id)}
                              style={
                                attr.type === 'text' && this.state.array[attr.id] === attrItem.value
                                  ? { backgroundColor: '#000', color: '#fff', cursor: 'pointer' }
                                  : attr.type === 'swatch' && this.state.array[attr.id] !== attrItem.value
                                  ? { backgroundColor: attrItem.value, cursor: 'pointer' }
                                  : attr.type === 'swatch' && this.state.array[attr.id] === attrItem.value
                                  ? {
                                      backgroundColor: attrItem.value,
                                      cursor: 'pointer',
                                      border: '1px solid #5ECE78',
                                      borderSpacing: '5px',
                                      borderCollapse: 'separate',
                                    }
                                  : {}
                              }
                              value={attrItem.value}
                            >
                              {' '}
                              {attr.type === 'text' ? attrItem.value : ''}
                            </button>
                          ))}
                        </div>
                      ))}
                      <div>
                        <div id="Price">Price:</div>
                        <div id="Amount">
                          {(() => {
                            switch (true) {
                              case this.props.selectedValue === this.props.currency[0]:
                                return (
                                  <div>
                                    {data.product.prices[0].currency.symbol} <></>
                                    {data.product.prices[0].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[1]:
                                return (
                                  <div>
                                    {data.product.prices[1].currency.symbol} <></>
                                    {data.product.prices[1].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[2]:
                                return (
                                  <div>
                                    {data.product.prices[2].currency.symbol} <></>
                                    {data.product.prices[2].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[3]:
                                return (
                                  <div>
                                    {data.product.prices[3].currency.symbol} <></>
                                    {data.product.prices[3].amount}
                                  </div>
                                );
                              case this.props.selectedValue === this.props.currency[4]:
                                return (
                                  <div>
                                    {data.product.prices[4].currency.symbol} <></>
                                    {data.product.prices[4].amount}
                                  </div>
                                );
                              default:
                                return (
                                  <div>
                                    {data.product.prices[0].currency.symbol} <></>
                                    {data.product.prices[0].amount}
                                  </div>
                                );
                            }
                          })()}
                        </div>
                      </div>
                      <div className="AddToCart">
                        {!data.product.inStock ? (
                          <>
                            <button disabled style={{ opacity: 0.5 }}>
                              ADD TO CART
                            </button>
                            <div id="OutOfStock">This item is out of stock!</div>
                          </>
                        ) : (
                          <button onClick={(e) => this.addToCart(e, data.product)}>ADD TO CART</button>
                        )}
                      </div>
                      <div
                        id="Product-description"
                        style={{
                          background: this.props.hover && 'rgba(192, 192, 192 0.3)',
                        }}
                        dangerouslySetInnerHTML={{ __html: data.product.description }}
                      ></div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>
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
    hover: state.hover.hover,
  };
};

export default connect(mapStateToProps)(ProductPage);