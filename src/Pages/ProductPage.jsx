import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag" ; 
import './ProductPage.css';
import "../App.css";
import { connect } from "react-redux";

const GET_PRODUCT = gql`
query GetProduct($id: String!) {
    product (id: $id) {
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices  {
        currency {
          symbol
        }
        amount
      }
      brand
  }
}`;

class ProductPage  extends Component {
    constructor ()
    {
    super();
    this.state = {
        id: {}
    }
  }

    componentDidMount() {
        this.setState({
            id: window.location.pathname.split('/')[2]
          });
    }

  render() {
    return (
    <Query query={GET_PRODUCT} variables={{id: this.state.id}} >
     {({ loading, error, data}) => {
       
       if (loading) return <p>Loading...</p>;
       if (error) return <p>{error.toString()} </p>;
      console.log(data.product.attributes[0].type)
      return (
        <div>
          <div className="Product">
           <div className="images">
             <img src={data.product.gallery[1]}/>
             <img src={data.product.gallery[2]}/>
             <img src={data.product.gallery[3]}/>
             <img src={data.product.gallery[4]}/>
          </div>
         </div>
         <div className='Product-content'>
            <img src={data.product.gallery[0]}/>
            <div className='Description'>
              <h1>{data.product.brand}</h1>
              <h2>{data.product.name}</h2>

              {data.product.category === "clothes" && data.product.attributes[0] &&
              
              <div className='Size-buttons'>
              <div>Size:</div>
              <button>{data.product.attributes[0].items[0].value}</button>
              <button>{data.product.attributes[0].items[1].value}</button>
              <button>{data.product.attributes[0].items[2].value}</button>
              <button>{data.product.attributes[0].items[3].value}</button>
            </div>
            
            }
              {data.product.category === "tech" && data.product.attributes[0].type === "swatch" &&
              data.product.attributes[0] &&
              <>
              <div className='Color-buttons'>
              <h3>Color:</h3>
              <button style={{backgroundColor: data.product.attributes[0].items[0].value}}></button>
              <button style={{backgroundColor: data.product.attributes[0].items[1].value}}></button>
              <button style={{backgroundColor: data.product.attributes[0].items[2].value}}></button>
              <button style={{backgroundColor: data.product.attributes[0].items[3].value}}></button>
              <button style={{backgroundColor: data.product.attributes[0].items[4].value}}></button>
            </div>
            <div className='otherAttributes'>
              <h3>{data.product.attributes[1].name}:</h3>
              <div>{data.product.attributes[1].items[0].value}</div>
              <div>{data.product.attributes[1].items[1].value}</div>
            </div> 
           </>
  
            }

            {data.product.category === "tech" && data.product.attributes[1].type === "swatch" &&
            data.product.attributes[0]  &&
              <>
             <div className='Color-buttons'>
             <h3>Color:</h3>
             <button style={{backgroundColor: data.product.attributes[1].items[0].value}}></button>
             <button style={{backgroundColor: data.product.attributes[1].items[1].value}}></button>
             <button style={{backgroundColor: data.product.attributes[1].items[2].value}}></button>
             <button style={{backgroundColor: data.product.attributes[1].items[3].value}}></button>
             <button style={{backgroundColor: data.product.attributes[1].items[4].value}}></button>
           </div>
           <div className='otherAttributes'>
             <h3>{data.product.attributes[0].name}:</h3>
             <div>{data.product.attributes[0].items[0].value}</div>
             <div>{data.product.attributes[0].items[1].value}</div>
          </div>
          </>
  
          }

           {data.product.category === "tech" && data.product.attributes[0].type === "text" &&
           data.product.attributes[1].type === "text" && data.product.attributes[0] &&
              <>
           <div className='otherAttributes'>
             <h3>{data.product.attributes[0].name}:</h3>
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
     }
            {!data.product.attributes &&
            <div>kai</div>
            }
 

              <div className='Price'>
                <div>Price:</div>
                <div>
                {(() => {
        switch (true) {
          case this.props.selectedValue === this.props.currency[0]:
            return (
              <div>
              {data.product.prices[0].currency.symbol} <></>
              {data.product.prices[0].amount}
              </div>
            )
          case this.props.selectedValue === this.props.currency[1]:
            return (
              <div>
              {data.product.prices[1].currency.symbol} <></>
              {data.product.prices[1].amount}
              </div>
            )
          case this.props.selectedValue === this.props.currency[2]:
            return (
              <div>
              {data.product.prices[2].currency.symbol} <></>
              {data.product.prices[2].amount}
              </div>
            )
          case this.props.selectedValue === this.props.currency[3]:
            return (
              <div>
              {data.product.prices[3].currency.symbol} <></>
              {data.product.prices[3].amount}
              </div>
            )
          case this.props.selectedValue === this.props.currency[4]:
            return (
              <div>
              {data.product.prices[4].currency.symbol} <></>
              {data.product.prices[4].amount}
              </div>
            )
          default:
            return (
              <div>
              {data.product.prices[0].currency.symbol} <></>
              {data.product.prices[0].amount}
              </div>
            )
        }
      })()}
                </div>
              <div className='AddToCart'>
                <button>ADD TO CART</button>
              </div>
              <div className='Product-description' dangerouslySetInnerHTML={{__html: data.product.description}}></div>
              </div>
            </div>
        </div>
       </div>
    )
    }}
</Query>
   )
}
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency, 
    selectedValue: state.selectedValue.selectedValue
  }
}
export default connect (mapStateToProps) (ProductPage); 