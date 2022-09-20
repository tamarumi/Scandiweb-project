import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import gql from 'graphql-tag';
import './ProductList.css';
import { connect } from 'react-redux';

const GET_PRODUCTS = gql`
  query getAll($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

class ProductList extends Component {
  render() {
    return (
      <Query query={GET_PRODUCTS} variables={{ title: this.props.title }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( </p>;

          return (
            <div>
              <div className="Category-name">{this.props.title}</div>

              <div className="ProductList">
                {data.category.products.map((product, index) => {
                  return (
                    <>
                      <Link
                        className="text-link"
                        to={`/productpage/${product.id}`}
                        key={index}
                        style={!product.inStock ? { opacity: 0.5, background: '#FFFFFF' } : { opacity: 1 }}
                        >
                        {!product.inStock && <div id="text">Out of stock</div>}
                        <img src={product.gallery[0]}></img>
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
                      </Link>
                    </>
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
  };
};

export default connect(mapStateToProps)(ProductList);
