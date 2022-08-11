import React, {Component} from 'react';
import './App.css';
import ProductList from './Pages/ProductList';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";


class App extends Component {
  constructor()
  {
    super();
    this.state={
      title: "clothes"
    }
  }

componentDidMount () {
  setTimeout (() => {
    this.props.navigate ("/productlist");
  }, 5);
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
    <div className='Categories'>
      <div onClick = {(e) => this.handleAll(e)}>All</div>
      <div onClick = {(e) => this.handleClothes(e)}>Clothes</div>
      <div onClick ={(e) => this.handleTech(e)}>Tech</div>
    </div>
   <div>
   </div>
   <>
    <Routes>
      <Route path="/productlist" element={<ProductList title={this.state.title}/>}/>
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




