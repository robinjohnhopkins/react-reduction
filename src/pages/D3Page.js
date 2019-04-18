import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import Page from 'components/Page';

import { iconD3Data, numberD3Data } from 'demos/D3Page';
import Viz from 'demos/Viz.js'

export default class D3Page extends Component {
  state = {
	  color: "", 
	  width: "", 
	  toDraw: [], 
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
        <label htmlFor="colorSelect">pick a color:</label>
        <select id="colorSelect" name="color" onChange={this.onChange} value={this.state.color||"default"}>
          <option disabled value="default">choose</option>
          <option value="red">red</option>
          <option value="orange">orange</option>
          <option value="yellow">yellow</option>
        </select>
        <label htmlFor="pixelInput">how big:</label>
        <input id="pixelInput" name="width" onChange={this.onChange} />
        <button type="submit">draw!</button>
        </form>
        { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>
      </Page>
    );
  }
};
