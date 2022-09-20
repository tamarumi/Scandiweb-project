import React, { Component } from 'react';
import './App.css';
import './Pages/ProductPage.css';
import ProductList from './Pages/ProductList';
import ProductPage from './Pages/ProductPage';
import CurrencyChange from './Pages/CurrencyChange';
import CartPage from './Pages/CartPage';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'all',
      isActive: false,
      cartItems: [],
    };
    
  }

  componentDidMount() {
     setTimeout(() => {
       this.props.navigate('/productlist');
     }, 5);
  }

  handleAll(e) {
    e.preventDefault();
    this.setState({ title: 'all' });
    this.componentDidMount();
  }

  handleClothes(e) {
    e.preventDefault();
    this.setState({ title: 'clothes' });
    this.componentDidMount();
  }

  handleTech(e) {
    e.preventDefault();
    this.setState({ title: 'tech' });
    this.componentDidMount();
  }

  

  render() {
    return (
      <div className="App">
        <CurrencyChange navigate={this.props.navigate} />
        <div className="Categories">
          <div
            className="all"
            onClick={(e) => this.handleAll(e)}
            style={
              this.state.title === 'all'
                ? {
                    color: 'green',
                    textDecoration: 'underline',
                    textUnderlineOffset: '22px',
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
                    textUnderlineOffset: '22px',
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
                    textUnderlineOffset: '22px',
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
        <>
          <Routes>
            <Route path="/productlist" element={<ProductList title={this.state.title} />} />
            <Route path="/productpage/:id" element={<ProductPage title={this.state.title} cartItems={this.state.cartItems}/>} />
            <Route path="/cartpage" element={<CartPage cartItems={this.state.cartItems}/>} />
          </Routes>
        </>
      </div>
    );
  }
}

export function APPwithRouter(props) {
  const navigate = useNavigate();
  return <App navigate={navigate}></App>;
}

const mapStateToProps = (state) => {
  return {
    hidden: state.hidden.hidden,
  };
};



export default connect(mapStateToProps)(App);
