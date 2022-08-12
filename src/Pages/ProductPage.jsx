import React, {Component} from 'react';
import { Query } from "@apollo/client/react/components";
import gql from "graphql-tag" ; 


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
      const id = this.props.match && this.props.match.params.id
      this.setState({
          id: id
      })
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
       </div>
    )
    }}
</Query>
   )
}
}

export default ProductPage; 