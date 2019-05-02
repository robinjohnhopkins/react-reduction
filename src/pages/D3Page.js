import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Page from 'components/Page';
import Viz from 'demos/Viz.js'
import VizPlay from 'demos/VizPlay.js'
import VizMultiLine from 'demos/VizMultiLine.js'
import VizFancy from 'demos/VizFancy.js'
import VizForceDirectedLayout from 'demos/VizForceDirectedLayout.js'
import axios from 'axios'
import 'react-bootstrap-table/css/react-bootstrap-table.css'

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var products = [{
  id: 1,
  name: "Product1",
  price: 120
}, {
  id: 2,
  name: "Product2",
  price: 80
}];

export default class D3Page extends Component {
  state = {
    vizSel: 'vizPlay',
	  color: "red", 
    width: "10", 
    exponent: 1,
	  toDraw: [{color:'blue', width: '20'}], 
  }
  constructor(){
    super();
    // run java spring REST app ~/workspace/vertex/ to provide edges and vertexes json
    this.doUpdate = this.doUpdate.bind(this);
    axios.get('http://localhost:8080/edges')
    .then(edgesResponse => {
      // console.log('edges', edgesResponse);
      axios.get('http://localhost:8080/vertexes')
      .then(vertexesResponse => {
        console.log('vertexes', vertexesResponse, edgesResponse);
        this.doUpdate(vertexesResponse, edgesResponse);
      });
  
    });
  }
  doUpdate(vertexesResponse, edgesResponse){
    //console.log('doUpdate vertexes', vertexesResponse.data, edgesResponse.data);
    this.setState({
          data: {
            nodes: vertexesResponse.data,
            edges: edgesResponse.data
          }
        });
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
        <select id="vizSelect" name="vizSel" onChange={this.onChange}  style={{padding:'30px !important', textIndent: '5px', margin: '10px', width:'150px'}} 
          value={this.state.vizSel||"default"}>
          <option disabled value="default">choose</option>
          <option value="viz">viz</option>
          <option value="vizPlay">vizPlay</option>
          <option value="VizMultiLine">VizMultiLine</option>
          <option value="VizFancy">VizFancy</option>
          <option value="ForceDirectedLayout">ForceDirectedLayout</option>
        </select>
        { this.state.vizSel === 'viz' ? 
          <div>
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
          </div>
          : null
          }
        </form>
        { this.state.toDraw.length ? 
          (this.state.vizSel == 'ForceDirectedLayout' ?
          <div >
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12} className="zmb-3">
                      <VizForceDirectedLayout data={this.state.data} />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12} className="zmb-3">
                    {/* <table>
                      <tbody>
                        <tr>
                          <th>Firstname</th>
                          <th>Lastname</th> 
                          <th>Age</th>
                        </tr>
                        <tr>
                          <td>Jill</td>
                          <td>Smith</td> 
                          <td>50</td>
                        </tr>
                        </tbody>
                      </table> */}
                      <BootstrapTable data={products} striped hover>
                          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
                          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                      </BootstrapTable>
                    </Col>
                </Row>
            </div>:
           this.state.vizSel == 'vizPlay' ? 
          <VizPlay shapes={this.state.toDraw}/> :
          (this.state.vizSel == 'VizMultiLine' ?
          <div>
            <table>
              <tbody>
              <tr>
                  <td>
                      <span>Emphasize Lower Range</span>
                  </td>
                  <td>
                      <input name="exponent" onChange={this.onChange} type="range" min=".1" max="5" 
                        value={this.state.exponent} step=".1" className="slider" id="myRange"/>
                  </td>
                  <td>
                      <span>Emphasize Upper Range</span>
                  </td>
              </tr>
              </tbody>
          </table>
          <VizMultiLine shapes={this.state.toDraw} exponent={this.state.exponent} /> 
          </div>
          : (this.state.vizSel == 'VizFancy' ? 
          <div>
          <table>
            <tbody>
            <tr>
                <td>
                    <span>Emphasize Lower Range</span>
                </td>
                <td>
                    <input name="exponent" onChange={this.onChange} type="range" min=".1" max="5" 
                      value={this.state.exponent} step=".1" className="slider" id="myRange"/>
                </td>
                <td>
                    <span>Emphasize Upper Range</span>
                </td>
            </tr>
            </tbody>
        </table>
        <VizFancy shapes={this.state.toDraw} exponent={this.state.exponent} /> 
        </div> :
          <Viz shapes={this.state.toDraw}  />))) : null}
      </div>
      </Page>
    );
  }
};
