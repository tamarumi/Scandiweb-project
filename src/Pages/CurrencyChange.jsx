import React, {Component} from 'react';
import gql from "graphql-tag" ; 
import "./ProductList.css";
import {request} from 'graphql-request';
import "../App.css"
import { connect } from "react-redux";
import {currency} from '../actions/currencyAction'
import { selectedValue } from '../actions/selectedValueAction';


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
      array1: [],
      selectedValue: "$",
    }
    
    }
    
   componentDidMount() {
        request("http://localhost:4000/", GET_PRICES).then((data) => {
        let length = data.currencies.length;
        for (let i = 0; i < length; i++) {
          this.state.array1.push(data.currencies[i].symbol + " " + data.currencies[i].label);
       }
        this.setState({array1: this.state.array1.slice(0,5)}); 
      })
    }

    componentDidUpdate() {
      this.props.setCurrency(this.state.array1);
    }
   
    onElementClicked(type, e){
       e.preventDefault();
       //this.setState({selectedValue: type});
       this.props.setSelectedValue(type)
       console.log(this.state.selectedValue)
    }
    
    onButton (e) {
        e.preventDefault();
        this.props.openClose();
        //this.props.setCurrency(this.state.array1);
    }

    render() {
        return (
           <div className='custom-select'>
           <div className='select'>
           <div className='dollarSign' onClick={(e)=> this.onButton(e)}>{this.props.selectedValue[0]} <i className="arrow down"></i></div>
           {this.props.open &&  
           <>
             {this.props.currency.map((type, key) => {
               return(
               <div 
                  onClick = {(e) => this.onElementClicked(type,e)} key={key}
                >
                {type} 
               </div>
               );
            })
            }
            </>
            }
           </div>
         </div>
       )
   }   
}

const mapStateToProps = (state) => {
  return {
    open: state.open.open,
    currency : state.currency.currency, 
    selectedValue: state.selectedValue.selectedValue
  }
}

const mapDispatchToProps = ( dispatch ) => { 
  return ({
    openClose: () => dispatch({type: "IS_OPEN"}),
    setCurrency: (array1)=>dispatch({type: "GET_CURRENCY", payload: array1}, currency(array1)),
    setSelectedValue: (type)=>dispatch({type: "SELECTEDVALUE", payload: type}, selectedValue(type))
  })
}

export default connect (mapStateToProps, mapDispatchToProps)(CurrencyChange);