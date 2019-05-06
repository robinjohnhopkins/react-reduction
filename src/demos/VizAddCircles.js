import React, { Component } from 'react';
import Viz from 'demos/Viz.js'

export default class VizAddCircles extends Component {
  state = {
	  color: "red", 
    width: "10", 
    toDraw: [{color:'blue', width: '20'}], 
  }
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = (evt) => {
    console.log('onSubmit ', evt.target, evt);
  	evt.preventDefault(); 
  	const newShape = {
  	   color: this.state.color, 
  	   width: this.state.width,
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 
  onChange = (evt) => {
  	console.log('viz selection change ', evt.target.name, evt.target.value);
  	this.setState({[evt.target.name]: evt.target.value})
  }
  render() {  
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="colorSelect">pick a color:</label>
          <select id="colorSelect" name="color" onChange={this.onChange} 
            style={{padding:'30px !important', textIndent: '5px', margin: '10px'}}
            value={this.state.color||"default"}>
            <option disabled value="default">choose</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
          </select>
          <label htmlFor="pixelInput">how big:</label>
          <input id="pixelInput" name="width" onChange={this.onChange} value={this.state.width} />
          <button type="submit">draw!</button>
          <Viz shapes={this.state.toDraw} />
        </form>
      </div>
        );
  }
};
