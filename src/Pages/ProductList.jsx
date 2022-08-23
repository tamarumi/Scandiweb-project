import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag" ; 
import "./ProductList.css";
//import { currency } from '../App.js';


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
  constructor (props) {
    super(props);
    //console.log(this.props.currency)
  }
    render() {  
        return (
        <Query query={GET_PRODUCTS} variables={{title: this.props.title}}>
         {({ loading, error, data}) => {
           
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;
            //console.log(data.category.products.prices.currency.symbol)

            return (
                <div className= "ProductList"> 
                {data.category.products.map ((product,index)=> {
                   return ( 
                   <Link className="text-link" to={`/productpage/${product.id}`} key={index}>
                   <img src={product.gallery[0]}></img>
                   <h2>{product.name}</h2>
                   <div className='Product-price'>
                   <p>{product.prices[1].currency.symbol}</p>
                   <p>{product.prices[1].amount}</p>
                   <p>
                   
                   </p>
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



       