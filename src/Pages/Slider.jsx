import React, {Component} from 'react';
import './Cart.css'

class Slider extends Component{
  constructor(props){
      super(props);
      const items = this.props.item.gallery;
      this.state = {
          slides: [
              items[0], items[1], items[2], items[3], items[4]
          ],
          currentIndex: 0
      }
      console.log(this.props.item)
      
  }
 
   goPrevious(e){
     e.preventDefault();
     const isFirstSlide = this.state.currentIndex === 0;
     const nexIndex = isFirstSlide ? this.state.slides.length - 1 : this.state.currentIndex - 1;
     this.setState({currentIndex: nexIndex})
   }

   goNext(e){
    e.preventDefault();
    const isLastSlide = this.state.currentIndex === this.state.slides.length - 1;
    const nexIndex = isLastSlide ? 0 : this.state.currentIndex + 1;
    this.setState({currentIndex: nexIndex})
   }

  render(){
      return (
        <div className="sliderImages">
          <div className="arrows">
           <div className='ArrowContainer'>
            <div onClick={(e) => this.goPrevious(e)} className="Arrow left"> </div>
            </div>
            <div className='ArrowContainer'>
            <div onClick={(e) => this.goNext(e)} className="Arrow right"> 
              {' '}
            </div>
            </div>
          </div>
          <img src={this.state.slides[this.state.currentIndex]} />
        </div>
      );
  }
}

export default Slider;