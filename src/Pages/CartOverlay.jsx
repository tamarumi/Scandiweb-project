import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CartOverlay.css';

class CartOverlayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.cartItems || [],
      array: [],
    };
  }
  //Responsible to select/add the clicked attribute in "chosen attributes(chosenAttributes)"
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
  //Navigate from overlay to cartPage when clicking "VIEW BAG"
  onCart(e) {
    e.preventDefault();
    this.props.navigate('/cartpage');
  }

  render() {
    const { cartItems } = this.state;
    const currency_symbol = this.props.selectedValue?.split(' ')?.[0];
    const countNumbers = cartItems.reduce((acc, curr) => {
      let amount = curr.prices.find((p) => p.currency?.symbol === currency_symbol)?.amount;
      return (acc += amount * curr.count);
    }, 0);

    return (
      <>
        <div className="basket2">
          {cartItems.length === 0 ? (
            'Cart is empty'
          ) : (
            <div className="cartItems2">
              <p id="bag">My Bag, {cartItems.reduce((accum, item) => accum + item.count, 0)} items</p>
              {cartItems.map((item) => {
                const chosenAttributes = item.chosenAttributes;
                const defaults = item.defaults;
                return (
                  <div className="items" key={item.name}>
                    <section>
                      <div className="titles">
                        <div>{item.brand}</div>
                        <div>{item.name}</div>
                      </div>
                      {(() => {
                        switch (true) {
                          case this.props.selectedValue === this.props.currency[0]:
                            return (
                              <div className="amount">
                                {item.prices[0].currency.symbol} <></>
                                {item.prices[0].amount}
                              </div>
                            );
                          case this.props.selectedValue === this.props.currency[1]:
                            return (
                              <div className="amount">
                                {item.prices[1].currency.symbol} <></>
                                {item.prices[1].amount}
                              </div>
                            );
                          case this.props.selectedValue === this.props.currency[2]:
                            return (
                              <div className="amount">
                                {item.prices[2].currency.symbol} <></>
                                {item.prices[2].amount}
                              </div>
                            );
                          case this.props.selectedValue === this.props.currency[3]:
                            return (
                              <div className="amount">
                                {item.prices[3].currency.symbol} <></>
                                {item.prices[3].amount}
                              </div>
                            );
                          case this.props.selectedValue === this.props.currency[4]:
                            return (
                              <div className="amount">
                                {item.prices[4].currency.symbol} <></>
                                {item.prices[4].amount}
                              </div>
                            );
                          default:
                            return (
                              <div className="amount">
                                {item.prices[0].currency.symbol} <></>
                                {item.prices[0].amount}
                              </div>
                            );
                        }
                      })()}

                      {item.attributes?.map((attr) => {
                        return (
                          <div className={['Size', 'Color'].includes(attr.id) ? attr.id + '-buttons2' : 'OtherAttributes2'} key={attr.name}>
                            <div className="Capacity2">{attr.name}:</div>
                            {attr.items.map((attrItem) => (
                              <button
                                key={attrItem.displayValue}
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

                      {item.name === 'AirTag' && <div style={{ fontSize: '2px', color: 'green' }}></div>}
                      <br></br>
                    </section>
                    <div className="count2">
                      <button onClick={(e) => this.addCount(e, item, 1)}>+</button>
                      <div>{item.count}</div>
                      <button onClick={(e) => this.addCount(e, item, -1)}>-</button>
                    </div>
                    <div className="slider2">
                      <img id="imageSlider" src={item.gallery[0]} alt="Overlay Image slider "></img>
                    </div>
                  </div>
                );
              })}
              <span className="totalOnOverlay">
                <span id="total">Total: </span>
                <span className="numbers2">
                  {Math.floor(countNumbers * 100) / 100}
                  {currency_symbol}
                </span>
              </span>
              <div className="endButtons">
                <button id="viewBagButton" onClick={(e) => this.onCart(e)}>
                  view bag
                </button>
                <button id="checkOutButton">check out</button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    selectedValue: state.selectedValue.selectedValue,
    hover: state.hover.hover,
  };
};

export default connect(mapStateToProps)(CartOverlayPage);
