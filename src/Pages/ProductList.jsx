import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag" ; 


const GET_PRODUCTS = gql`
query getAll ($title: String!) {
  category (input: {
    title: $title}) {
    name
    products {
      id 
      name
      gallery
      prices  {
        currency {
          symbol
        }
        amount
      }
    }
  }
}`
 
class ProductList  extends Component {
    
    render() {  
        return (
        <Query query={GET_PRODUCTS} variables={{title: this.props.title}}>
         {({ loading, error, data}) => {
           
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;
            
            return (
                <div className= "ProductList"> 
                {data.category.products.map (product => {
                   return ( 
                   <Link className="text-link" to={`/productpage/${product.id}`}>
                   <img src={product.gallery[0]}></img>
                   <h2>{product.name}</h2>
                   <div className='Product-price'>
                   <p>{product.prices[0].currency.symbol}</p>
                   <p>{product.prices[0].amount}</p>
                   </div>
                  </Link>
                );
            })};
       </div>
        )
    }}
    </Query>
        )
    }
}

 export default ProductList;



       