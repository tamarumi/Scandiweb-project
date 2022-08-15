import React, {Component} from 'react';
import gql from "graphql-tag" ; 
import "./ProductList.css";
import {request} from 'graphql-request';
import "../App.css"


const GET_PRICES = gql`
    query getPrices {
      currencies {
            symbol
            label
        }
    }`
   
class CurrencyChange extends Component {
    constructor(props)
    {
    super(props);
    this.state= {
      array: [],
      selectedValue: "$",
      open: false
    }
   
   }
    
    componentDidMount() {
        request("http://localhost:4000/", GET_PRICES).then((data) => {
        let length = data.currencies.length;
        for (let i = 0; i < length; i++) {
           this.state.array.push(data.currencies[i].symbol + " " + data.currencies[i].label)
        }
        this.setState({array: this.state.array.slice(0,5)});
    })
    }
   
    onElementClicked(type, e){
       e.preventDefault();
       this.setState({selectedValue: type});
    }
    
    onButton(e) {
        e.preventDefault();
        this.setState({open: !this.state.open});
        this.props.setCurrency(this.state.array)
    }

    render() {
        return (
           <div className='custom-select'>
           <div className='select'>
           <div className='dollarSign' onClick={(e)=> this.onButton(e)}>{this.state.selectedValue[0]}</div>
           { this.state.open && 
           <>
           {this.props.currency.map ((type, key) => {
               return(
               <div 
                  onClick = {(e) => this.onElementClicked(type,e)} key={key}
                >
                {type} 
               </div>
               );
            })}
            </>
            }
           </div>
         </div>
       )
   }   
}

export default CurrencyChange