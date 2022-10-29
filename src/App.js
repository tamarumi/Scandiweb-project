import React, { Component } from 'react';
import './App.css';
import './Pages/ProductPage.css';
import ProductList from './Pages/ProductList';
import ProductPage from './Pages/ProductPage';
import CurrencyChange from './Pages/CurrencyChange';
import CartPage from './Pages/CartPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import svg from './images/svg.png';
import svgArrow from './images/svgArrow.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'all',
      cartItems: [],
    };
  }

  componentDidMount() {
     setTimeout(() => {
       this.props.navigate('/productlist');
     }, 5);
  }
  //Show all products
  handleAll(e) {
    e.preventDefault();
    this.setState({ title: 'all' });
    this.componentDidMount();
  }
  //Show only clothes
  handleClothes(e) {
    e.preventDefault();
    this.setState({ title: 'clothes' });
    this.componentDidMount();
  }
  //Show only tech
  handleTech(e) {
    e.preventDefault();
    this.setState({ title: 'tech' });
    this.componentDidMount();
  }

  render() {
    return (
      <div className="App">
        <section className="header">
          <div className="Categories">
            <div
              className="all"
              onClick={(e) => this.handleAll(e)}
              style={
                this.state.title === 'all'
                  ? {
                      color: 'green',
                      textDecoration: 'underline',
                      textUnderlineOffset: '20px',
                      fontWeight: 800,
                    }
                  : {
                      color: '',
                    }
              }
            >
              All
            </div>
            <div
              className="clothes"
              onClick={(e) => this.handleClothes(e)}
              style={
                this.state.title === 'clothes'
                  ? {
                      color: 'green',
                      textDecoration: 'underline',
                      textUnderlineOffset: '20px',
                      fontWeight: 800,
                    }
                  : {
                      color: '',
                    }
              }
            >
              Clothes
            </div>
            <div
              className="tech"
              onClick={(e) => this.handleTech(e)}
              style={
                this.state.title === 'tech'
                  ? {
                      color: 'green',
                      textDecoration: 'underline',
                      textUnderlineOffset: '20px',
                      fontWeight: 800,
                    }
                  : {
                      color: '',
                    }
              }
            >
              Tech
            </div>
          </div>
          <div style={{ position: 'relative', margin: 0, padding: 0 }}>
            <img className="svg" src={svg} alt="Brand icon"/>
            <img className="svgArrow" src={svgArrow} alt="Brand icon arrow"/>
          </div>
          <CurrencyChange navigate={this.props.navigate} cartItems={this.state.cartItems} />
          </section>
          <>
            <Routes>
              <Route path="/productlist" element={<ProductList title={this.state.title} cartItems={this.state.cartItems} />} />
              <Route path="/productpage/:id" element={<ProductPage title={this.state.title} cartItems={this.state.cartItems} />} />
              <Route path="/cartpage" element={<CartPage cartItems={this.state.cartItems} />} />
            </Routes>
          </>
      </div>
    );
  }
}
//Helps to navigate between pages
export function APPwithRouter(props) {
  const navigate = useNavigate();
  return <App navigate={navigate}></App>;
}

export default App;
