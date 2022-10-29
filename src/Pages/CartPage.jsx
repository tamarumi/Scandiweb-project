import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import Slider from './Slider';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.cartItems || [],
      array: [],
    };
  }

  //Responsible to select/add the clicked attribute in chosen attributes(chosenAttributes)
  makeActive(e, attr, item) {
    e.preventDefault();
    let et = e.currentTarget.textContent.trim() || e.currentTarget.value.trim();
    let arr = this.state.array;
    arr[attr] = et;
    this.setState({ array: arr });
    item.chosenAttributes[attr] = this.state.array[attr];
  }
  //Responsible to increment/decrement items' amounts on overlay
  addCount(e, item, d) {
    e.preventDefault();
    const cartItems = this.state.cartItems;
    const ind = cartItems.indexOf(item);
    let arr = cartItems;
    arr[ind].count += d;
    this.setState({ cartItems: [...arr] });
  //Delete item when its amount becomes zero
    if (arr[ind].count === 0) {
      arr = arr.filter((elm) => elm.id !== item.id);
      this.setState({ cartItems: [...arr] });
      localStorage.setItem('cartItems', cartItems);
      return { cartItems };
    }
  }

  render() {
    const { cartItems } = this.state;
    const currency_symbol = this.props.selectedValue?.split(' ')?.[0];
    //Items' prices sum up; Quantity * price
    const countNumbers = cartItems.reduce((acc, curr) => {
      let amount = curr.prices.find((p) => p.currency?.symbol === currency_symbol)?.amount;
      return (acc += amount * curr.count);
    }, 0);
    const car = 300;
   

    return (
      <div
        className="basketContainer"
        style={{
          background: this.props.hover && 'rgba(57, 55, 72, 0.22)',
          overflow: 'hidden',
          zIndex: this.props.hover && '2',
          padding: `0px 0px ${this.state.cartItems.length * 370}px`
        }}
      >
        <div className="basket" style={{ background: this.props.hover && 'lightgrey', zIndex: this.props.hover && '0' }}>
          {cartItems.length === 0 ? (
            'Cart is empty'
          ) : (
            <>
              <div className="cartItems">
                <div className="cart">CART</div>
                <hr className="hr"></hr>
                {cartItems.map((item) => {
                  const chosenAttributes = item.chosenAttributes;
                  const defaults = item.defaults;
                  return (
                    <div className="singleProduct" key={item.id}>
                      <div className="slider">
                        <Slider item={item} />
                      </div>
                      <div className="count">
                        <button onClick={(e) => this.addCount(e, item, 1)}>+</button>
                        <div>{item.count}</div>
                        <button onClick={(e) => this.addCount(e, item, -1)}>-</button>
                      </div>
                      <div id="itemBrand">{item.brand}</div>
                      <div id="itemName">{item.name}</div>
                      <div>{item.prices.amount}</div>
                      {/*Responsible to show the item price in chosen currency*/}
                      <div className="cartPrice">
                        {item.prices.find((p) => p.currency?.symbol === currency_symbol).currency.symbol} <></>
                        {item.prices.find((p) => p.currency?.symbol === currency_symbol).amount}
                      </div>

                      {item.attributes?.map((attr) => {
                        return (
                          <div className={['Size', 'Color'].includes(attr.id) ? attr.id + '-buttons' : 'OtherAttributes'} key={attr.id}>
                            <div>{attr.name}:</div>
                            {attr.items.map((attrItem) => (
                              <button
                                key={attrItem.id}
                                onClick={(e) => this.makeActive(e, attr.id, item)}
                                style={
                                  (chosenAttributes[attr.id] && chosenAttributes[attr.id] === attrItem.value) ||
                                  (defaults?.[attr.id] === attrItem.value &&
                                    (chosenAttributes[attr.id] ? chosenAttributes[attr.id] === defaults?.[attr.id] : true))
                                    ? attr.type === 'text'
                                      ? { backgroundColor: '#000', color: '#fff' }
                                      : attr.type === 'swatch'
                                      ? {
                                          border: '1px solid #5ECE78',
                                          backgroundColor: attrItem.value,
                                        }
                                      : {}
                                    : attr.type === 'swatch'
                                    ? { backgroundColor: attrItem.value }
                                    : {}
                                }
                                value={attrItem.value}
                              >
                                {' '}
                                {attr.type === 'text' ? attrItem.value : ''}
                              </button>
                            ))}
                          </div>
                        );
                      })}

                      {item.name === 'AirTag' && <div style={{ height: '100px' }}></div>}
                      <br></br>
                      <hr className="hr"></hr>
                    </div>
                  );
                })}
              </div>
              <div className="beforeOrderInfo">
                {/*Taxation is theft :D but still..*/}
                <span style={{ paddingTop: '20px' }}>
                  {' '}
                  Tax 21%:{' '}
                  <span className="numbers">
                    {Math.floor(countNumbers * 21) / 100}
                    {currency_symbol}
                  </span>
                </span>
                <br></br>
                <span>
                  {' '}
                  Quantity: <span className="numbers">{cartItems.reduce((accum, item) => accum + item.count, 0)} </span>
                </span>
                <br></br>
                <span style={{ fontWeight: '500' }}>
                  Total:{' '}
                  <span className="numbers">
                    {Math.floor(countNumbers * 100) / 100}
                    {currency_symbol}
                  </span>
                </span>
                <br></br>
                <button id="orderButton">order</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    selectedValue: state.selectedValue.selectedValue,
    hover: state.hover.hover
  };
};

export default connect(mapStateToProps)(CartPage);

