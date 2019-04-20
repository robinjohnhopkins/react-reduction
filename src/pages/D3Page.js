import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';

import { iconD3Data, numberD3Data } from 'demos/D3Page';
import Viz from 'demos/Viz.js'
import VizPlay from 'demos/VizPlay.js'

export default class D3Page extends Component {
  state = {
    vizSel: 'vizPlay',
	  color: "red", 
	  width: "10", 
	  toDraw: [{color:'blue', width: '20'}], 
  }
  onSubmit = (evt) => {
  	evt.preventDefault(); 
  	const newShape = {
  	   color: this.state.color, 
  	   width: this.state.width,
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 

  onChange = (evt) => {
  	console.log('setting ', evt.target.name, evt.target.value);
  	this.setState({[evt.target.name]: evt.target.value})
  }
  render() {
    return (
      <Page
        className="D3Page"
        title="D3s"
        breadcrumbs={[{ name: 'D3s', active: true }]}
      >
      <div className="controller">
        <form onSubmit={this.onSubmit}>
        <label htmlFor="vizSelect">pick a color: </label>
        <select id="vizSelect" name="vizSel" onChange={this.onChange}  style={{padding:'30px !important', textIndent: '5px', margin: '10px'}} 
          value={this.state.vizSel||"default"}>
          <option disabled value="default">choose</option>
          <option value="viz">viz</option>
          <option value="vizPlay">vizPlay</option>
        </select>
        <label htmlFor="colorSelect">pick a color:</label>
        <select id="colorSelect" name="color" onChange={this.onChange} style={{padding:'30px !important', textIndent: '5px', margin: '10px'}}
          value={this.state.color||"default"}>
          <option disabled value="default">choose</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
        </select>
        <label htmlFor="pixelInput">how big:</label>
        <input id="pixelInput" name="width" onChange={this.onChange} />
        <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? (this.state.vizSel == 'vizPlay' ? 
          <VizPlay shapes={this.state.toDraw}/> :
          <Viz shapes={this.state.toDraw}/>) : null}
      </div>
      </Page>
    );
  }
};
