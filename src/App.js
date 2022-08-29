import React, {Component} from 'react';
import './App.css';
import './Pages/ProductPage.css'
import ProductList from './Pages/ProductList';
import ProductPage from './Pages/ProductPage';
import CurrencyChange from './Pages/CurrencyChange';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
//import {request} from 'graphql-request';
//import gql from "graphql-tag" ; 


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      title: "all",
    }
  }

componentDidMount () {
  setTimeout (() => {
    this.props.navigate ("/productlist");
  }, 5);
  /*request("http://localhost:4000/", GET_PRICES).then((data) => {
    let length = data.currencies.length;
    for (let i = 0; i < length; i++) {
      this.state.array1.push(data.currencies[i].symbol + " " + data.currencies[i].label);
   }
    this.setState({array1: this.state.array1.slice(0,5)}); 
  })*/
}

handleAll(e) 
{
  e.preventDefault();
  this.setState({title: "all"});
  this.componentDidMount();
}
handleClothes(e)
{
  e.preventDefault();
  this.setState({title: "clothes"});
  this.componentDidMount();
}
handleTech(e)
{
  e.preventDefault();
  this.setState({title: "tech"});
  this.componentDidMount();
}

render()  
{
  return (
    <div className="App">
    <CurrencyChange/>
    <div className='Categories'>
      <div onClick = {(e) => this.handleAll(e)}>All</div>
      <div onClick = {(e) => this.handleClothes(e)}>Clothes</div>
      <div onClick ={(e) => this.handleTech(e)}>Tech</div>
    </div>
   
   
   <>
    <Routes>
      <Route path="/productlist" element={<ProductList title={this.state.title}/>} /> 
      <Route path="/productpage/:id" element={<ProductPage title={this.state.title}/>}/>
    </Routes>
  </>
  </div>
  )
}

}


export function APPwithRouter(props) {
  const navigate = useNavigate();
  return (<App  navigate = {navigate}></App>)
}

export default App;





