import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor()
  {
    super();
    this.state={
      title: "clothes"
    }
  }

handleAll(e) 
{
  e.preventDefault();
  this.setState({title: "all"});
}
handleClothes(e)
{
  e.preventDefault();
  this.setState({title: "clothes"});
}
handleTech(e)
{
  e.preventDefault();
  this.setState({title: "tech"});
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
  </div>
  )
}

}

export default App;




