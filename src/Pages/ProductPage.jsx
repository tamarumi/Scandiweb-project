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
    };
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: window.location.pathname.split('/')[2],
    });
  }
  
  addToCart(e, product) {
    e.preventDefault();
    let productAlreadyInCart = false; 
    this.setState((state, props) => {
      const cartItems = this.props.cartItems;
      cartItems?.forEach((item) => {
        if (item.id === product.id) {
        productAlreadyInCart= true;
        }
      });
      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
        console.log(cartItems)
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return cartItems; 
    });
     
  }

  render() {
    return (
      <Query query={GET_PRODUCT} variables={{ id: this.state.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error.toString()} </p>;
          const id = data.product.id;
          return (
            <div>
              <ErrorBoundary>
                <div className="Product">
                  {data.product.gallery.length > 1 && (
                    <div className="images">
                      <img src={data.product.gallery[1]} />
                      <img src={data.product.gallery[2]} />
                      <img src={data.product.gallery[3]} />
                      <img src={data.product.gallery[4]} />
                    </div>
                  )}
                </div>
                <div className="Product-image">
                  <img src={data.product.gallery[0]} />
                  <div className="Product-content">
                    <h1 id="brand">{data.product.brand}</h1>
                    <h2 id="name">{data.product.name}</h2>

                    {data.product.category === 'clothes' && data.product.attributes[0] !== undefined && (
                      <div className="Size-buttons">
                        <div>Size:</div>
                        <button>{data.product.attributes[0].items[0].value}</button>
                        <button>{data.product.attributes[0].items[1].value}</button>
                        <button>{data.product.attributes[0].items[2].value}</button>
                        <button>{data.product.attributes[0].items[3].value}</button>
                      </div>
                    )}
                    {data.product.category === 'tech' &&
                      data.product.attributes[0] !== undefined &&
                      data.product.attributes[0]?.type === 'swatch' && (
                        <>
                          <div className="Color-buttons">
                            <h3 className="Color">Color:</h3>
                            <button style={{ backgroundColor: data.product.attributes[0].items[0].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[0].items[1].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[0].items[2].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[0].items[3].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[0].items[4].value }}></button>
                          </div>
                          <div className="OtherAttributes">
                            <h3 className="Capacity">{data.product.attributes[1].name}:</h3>
                            <button>{data.product.attributes[1].items[0].value}</button>
                            <button>{data.product.attributes[1].items[1].value}</button>
                          </div>
                        </>
                      )}

                    {data.product.category === 'tech' &&
                      data.product.attributes[0] !== undefined &&
                      data.product.attributes[1]?.type === 'swatch' && (
                        <>
                          <div className="Color-buttons">
                            <h3 className="Color">Color:</h3>
                            <button style={{ backgroundColor: data.product.attributes[1].items[0].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[1].items[1].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[1].items[2].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[1].items[3].value }}></button>
                            <button style={{ backgroundColor: data.product.attributes[1].items[4].value }}></button>
                          </div>
                          <div className="OtherAttributes">
                            <h3 className="Capacity">{data.product.attributes[0].name}:</h3>
                            <button>{data.product.attributes[0].items[0].value}</button>
                            <button>{data.product.attributes[0].items[1].value}</button>
                          </div>
                        </>
                      )}

                    {data.product.category === 'tech' &&
                      data.product.attributes[0] !== undefined &&
                      data.product.attributes[0]?.type === 'text' &&
                      data.product.attributes[1]?.type === 'text' && (
                        <>
                          <div className="OtherAttributes">
                            <h3 className="Capacity">{data.product.attributes[0].name}:</h3>
                            <button>{data.product.attributes[0].items[0].value}</button>
                            <button>{data.product.attributes[0].items[1].value}</button>
                            <h3>{data.product.attributes[1].name}:</h3>
                            <button>{data.product.attributes[1].items[0].value}</button>
                            <button>{data.product.attributes[1].items[1].value}</button>
                            <h3>{data.product.attributes[2].name}:</h3>
                            <button>{data.product.attributes[2].items[0].value}</button>
                            <button>{data.product.attributes[2].items[1].value}</button>
                          </div>
                        </>
                      )}

                    {data.product.name === 'AirTag' && <div style={{ fontSize: '2px', color: 'green' }}></div>}

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
                        <button onClick={(e) => this.addToCart(e, data.product)}  >ADD TO CART</button>
                      )}
                    </div>
                    <div id="Product-description" dangerouslySetInnerHTML={{ __html: data.product.description }}></div>
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
  };
};


export default connect(mapStateToProps)(ProductPage);
