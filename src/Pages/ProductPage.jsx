import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag" ; 
import './ProductPage.css';


const GET_PRODUCT = gql`
query GetProduct ($id: String!) {
    product (id: $id) {
      name
      inStock
      gallery
      description
      prices  {
        currency {
          symbol
        }
        amount
      }
  }
}`;

class ProductPage  extends Component {
    constructor ()
    {
    super();
    this.state = {
        id: null
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
        </div>
       </div>
    )
    }}
</Query>
   )
}
}

export default ProductPage; 