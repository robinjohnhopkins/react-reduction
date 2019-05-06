import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Page from 'components/Page';
import Viz from 'demos/Viz.js'
import VizPlay from 'demos/VizPlay.js'
import VizMultiLine from 'demos/VizMultiLine.js'
import VizFancy from 'demos/VizFancy.js'
import VizForceDirectedLayout from 'demos/VizForceDirectedLayout.js'
import axios from 'axios'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

var products = [{
  id: 1,
  name: "Product1",
  price: '120'
}, {
  id: 2,
  name: "Product2",
  price: '80'
}];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];
const columnsReal = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'category',
  text: 'category'
}];
// node={
//   category: "Fish",
//   id: "kb",
//   index: 10,
//   name: "kb"  
// }

export default class D3Page extends Component {
  state = {
    vizSel: 'vizPlay',
	  color: "red", 
    width: "10", 
    exponent: 1,
    toDraw: [{color:'blue', width: '20'}], 
    selectednode:[],
    screenWidth:  800,
  }
  constructor(){
    super();
    // run java spring REST app ~/workspace/vertex/ to provide edges and vertexes json
    this.doUpdate = this.doUpdate.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setSelected = this.setSelected.bind(this);
    axios.get('http://localhost:8080/edges')
    .then(edgesResponse => {
      // console.log('edges', edgesResponse);
      axios.get('http://localhost:8080/vertexes')
      .then(vertexesResponse => {
        // console.log('vertexes', vertexesResponse, edgesResponse);
        this.doUpdate(vertexesResponse, edgesResponse);
      });
  
    });
  }

  /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if(this.state.screenWidth != w) {
      this.setState({ screenWidth: w });
    } 
  }

  /**
   * Add event listener - we want a redraw on browser window redraw!
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * callback when node selected
   */
  setSelected(selectednode){
    //console.log('doUpdate vertexes', vertexesResponse.data, edgesResponse.data);
    if (selectednode && selectednode.id && selectednode.name){
      if (this.state.selectednode[0] == undefined || this.state.selectednode[0].id != selectednode.id){
        // this.setState(prevState => ({
        //   selectednode: {
        //     ...prevState.cardHeights,
        //     [index]: height,
        //   },
        //  }));
  
        this.setState(prevState => ({
          selectednode: [{
            'id':selectednode.id,
            'name':selectednode.name,
            'category':selectednode.category
          }]
        }),() => { // console.log('hey', JSON.stringify(this.state))
                  });  
  
      }
    }
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
  	console.log('viz selection change ', evt.target.name, evt.target.value);
  	this.setState({[evt.target.name]: evt.target.value})
  }
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('componentDidCatch', error, info);
  }
  render() {  
    if(this.state.selectednode != undefined){
      //console.log(this.state.selectednode);
    }
    if( this.state.data != undefined && this.state.data.nodes != undefined){
      // console.log(this.state.data.nodes);
    }
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
                    <Col lg={8} md={6} sm={6} xs={12} className="zmb-3">
                      <VizForceDirectedLayout data={this.state.data} 
                        setSelected={this.setSelected} screenWidth={this.state.screenWidth}/>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={12} className="zmb-3">
                    {this.state.data != undefined && this.state.data.nodes != undefined ? 
                      <div>
                        <BootstrapTable keyField='id' data={ this.state.data.nodes } columns={ columnsReal } 
                          pagination={ paginationFactory() }/>
                      </div>
                      : null }
                      {this.state.selectednode.length > 0 ? 
                      <div>
                        <p>selected:</p>
                        <BootstrapTable keyField='id' data={ this.state.selectednode } 
                          columns={ columnsReal } />
                      </div>
                      : null }
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
