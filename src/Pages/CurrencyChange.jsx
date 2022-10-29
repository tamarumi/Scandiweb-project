import React, { Component } from 'react';
import gql from 'graphql-tag';
import './ProductList.css';
import { request } from 'graphql-request';
import '../App.css';
import { connect } from 'react-redux';
import { currency } from '../actions/currencyAction';
import { selectedValue } from '../actions/selectedValueAction';
import trolley from '../images/trolley.png';
import CartOverlayPage from './CartOverlay';

const GET_PRICES = gql`
  query getPrices {
    currencies {
      symbol
      label
    }
  }
`;

class CurrencyChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyArray: [],
      selectedValue: '$',
    };
  }

  componentDidMount() {
    request('http://localhost:4000/', GET_PRICES).then((data) => {
      let length = data.currencies.length;
      for (let i = 0; i < length; i++) {
        this.state.currencyArray.push(data.currencies[i].symbol + ' ' + data.currencies[i].label);
      }
      //Array of all currencies' symbols + labels
      this.setState({ currencyArray: this.state.currencyArray.slice(0, 5) });
    });
  }
  
  componentDidUpdate() {
    this.props.setCurrency(this.state.currencyArray);
  }
  //Trigger the redux state, select a desirable currency from currency array
  onElementClicked(type, e) {
    e.preventDefault();
    this.props.setSelectedValue(type);
  }
  //Trigger the redux state, by clicking the dollar sign on header (opens the currency types' select menu)
  onButton(e) {
    e.preventDefault();
    this.props.openClose();
  }
  //Trigger the redux state, by clicking on trolley on header (opens the cart overlay)
  handleMouseOver(e) {
    e.preventDefault();
    this.props.onHover();
  }
  render() {
    
    return (
      <div>
        <div className="custom-select">
          <div className="select">
            <div className="actions">
              <div className="dollarSign" onClick={(e) => this.onButton(e)}>
                {this.props.selectedValue[0]}
                {this.props.open === true ? <i className="arrow up"></i> : <i className="arrow down"></i>}
              </div>
              <img src={trolley} id="trolley" onMouseOver={(e) => this.handleMouseOver(e)} alt="trolley image" />
              {(this.props.hover || window.location.pathname === '/cartpage') && (
                <button id="numberOfItems">{this.props.cartItems.reduce((accum, item) => accum + item.count, 0)}</button>
              )}
            </div>
            
            <div className="label">
              {this.props.open && (
                <React.Fragment>
                  {this.props.currency.map((type) => {
                    return (
                      <div onClick={(e) => this.onElementClicked(type, e)} key={type.split('')[0]}>
                        {type}
                      </div>
                    );
                  })}
                </React.Fragment>
              )}
            </div>
            {this.props.hover && (
              <div className="overlay">
                <CartOverlayPage cartItems={this.props.cartItems} navigate={this.props.navigate} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.open.open,
    currency: state.currency.currency,
    selectedValue: state.selectedValue.selectedValue,
    hover: state.hover.hover
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openClose: () => dispatch({ type: 'IS_OPEN' }),
    setCurrency: (currencyArray) => dispatch({ type: 'GET_CURRENCY', payload: currencyArray }, currency(currencyArray)),
    setSelectedValue: (type) => dispatch({ type: 'SELECTEDVALUE', payload: type }, selectedValue(type)),
    onHover: () => dispatch({ type: 'ON_HOVER' })
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyChange);
