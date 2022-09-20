import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cart.css';
import Slider from "./Slider"

class CartPage extends Component {
 constructor(props) {
  super(props);
  this.state = {
      cartItems: this.props.cartItems || [], 
  }
}

  addCount(e, item, d) {
     e.preventDefault();
     const cartItems = this.state.cartItems
     const ind = cartItems.indexOf(item);
     let arr = cartItems;
     arr[ind].count += d;
     this.setState({ cartItems: [...arr] });

     if (arr[ind].count === 0) {
      arr = arr.filter((elm) => elm.id !== item.id);
      this.setState({ cartItems: [...arr] });
      localStorage.setItem('cartItems', cartItems);
      return {cartItems};
    }
  }

  render(){
    const {cartItems} = this.state; 
     
    return (
      <div className="basket">
        {cartItems.length === 0 ? (
          'Cart is empty'
        ) : (
          <div className="cartItems">
            <div>CART</div>
            <hr></hr>
            {cartItems.map((item, key) => (
              <div key={key}>
                <div className='slider'>
                  <Slider item={item} />
                </div>
                <div className="count">
                  <button onClick={(e) => this.addCount(e, item, 1)}>+</button>
                  <div>{item.count}</div>
                  <button onClick={(e) => this.addCount(e, item, -1)}>-</button>
                </div>
                <div>{item.brand}</div>
                <div>{item.name}</div>
                <div>{item.prices.amount}</div>
                {(() => {
                  switch (true) {
                    case this.props.selectedValue === this.props.currency[0]:
                      return (
                        <div>
                          {item.prices[0].currency.symbol} <></>
                          {item.prices[0].amount}
                        </div>
                      );

                    case this.props.selectedValue === this.props.currency[1]:
                      return (
                        <div>
                          {item.prices[1].currency.symbol} <></>
                          {item.prices[1].amount}
                        </div>
                      );
                    case this.props.selectedValue === this.props.currency[2]:
                      return (
                        <div>
                          {item.prices[2].currency.symbol} <></>
                          {item.prices[2].amount}
                        </div>
                      );
                    case this.props.selectedValue === this.props.currency[3]:
                      return (
                        <div>
                          {item.prices[3].currency.symbol} <></>
                          {item.prices[3].amount}
                        </div>
                      );
                    case this.props.selectedValue === this.props.currency[4]:
                      return (
                        <div>
                          {item.prices[4].currency.symbol} <></>
                          {item.prices[4].amount}
                        </div>
                      );
                    default:
                      return (
                        <div>
                          {item.prices[0].currency.symbol} <></>
                          {item.prices[0].amount}
                        </div>
                      );
                  }
                })()}

                {item.category === 'clothes' && item.attributes[0] !== undefined && (
                  <div className="Size-buttons">
                    <div>Size:</div>
                    <button>{item.attributes[0].items[0].value}</button>
                    <button>{item.attributes[0].items[1].value}</button>
                    <button>{item.attributes[0].items[2].value}</button>
                    <button>{item.attributes[0].items[3].value}</button>
                  </div>
                )}

                {item.category === 'tech' && item.attributes[0] !== undefined && item.attributes[0]?.type === 'swatch' && (
                  <>
                    <div className="Color-buttons">
                      <h3 className="Color">Color:</h3>
                      <button style={{ backgroundColor: item.attributes[0].items[0].value }}></button>
                      <button style={{ backgroundColor: item.attributes[0].items[1].value }}></button>
                      <button style={{ backgroundColor: item.attributes[0].items[2].value }}></button>
                      <button style={{ backgroundColor: item.attributes[0].items[3].value }}></button>
                      <button style={{ backgroundColor: item.attributes[0].items[4].value }}></button>
                    </div>
                    <div className="OtherAttributes">
                      <h3 className="Capacity">{item.attributes[1].name}:</h3>
                      <button>{item.attributes[1].items[0].value}</button>
                      <button>{item.attributes[1].items[1].value}</button>
                    </div>
                  </>
                )}

                {item.category === 'tech' && item.attributes[0] !== undefined && item.attributes[1]?.type === 'swatch' && (
                  <>
                    <div className="Color-buttons">
                      <h3 className="Color">Color:</h3>
                      <button style={{ backgroundColor: item.attributes[1].items[0].value }}></button>
                      <button style={{ backgroundColor: item.attributes[1].items[1].value }}></button>
                      <button style={{ backgroundColor: item.attributes[1].items[2].value }}></button>
                      <button style={{ backgroundColor: item.attributes[1].items[3].value }}></button>
                      <button style={{ backgroundColor: item.attributes[1].items[4].value }}></button>
                    </div>
                    <div className="OtherAttributes">
                      <h3 className="Capacity">{item.attributes[0].name}:</h3>
                      <button>{item.attributes[0].items[0].value}</button>
                      <button>{item.attributes[0].items[1].value}</button>
                    </div>
                  </>
                )}

                {item.category === 'tech' &&
                  item.attributes[0] !== undefined &&
                  item.attributes[0]?.type === 'text' &&
                  item.attributes[1]?.type === 'text' && (
                    <>
                      <div className="OtherAttributes">
                        <h3 className="Capacity">{item.attributes[0].name}:</h3>
                        <button>{item.attributes[0].items[0].value}</button>
                        <button>{item.attributes[0].items[1].value}</button>
                        <h3>{item.attributes[1].name}:</h3>
                        <button>{item.attributes[1].items[0].value}</button>
                        <button>{item.attributes[1].items[1].value}</button>
                        <h3>{item.attributes[2].name}:</h3>
                        <button>{item.attributes[2].items[0].value}</button>
                        <button>{item.attributes[2].items[1].value}</button>
                      </div>
                    </>
                  )}

                {item.name === 'AirTag' && <div style={{ fontSize: '2px', color: 'green' }}></div>}
                <br></br>
                <hr></hr>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,
    selectedValue: state.selectedValue.selectedValue,
  }
}  

export default connect (mapStateToProps) (CartPage);
