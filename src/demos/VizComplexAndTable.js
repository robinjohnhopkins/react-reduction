import React, { useEffect, Component } from "react";
import { Row, Col } from 'reactstrap';
import VisComplex from 'demos/VisComplex';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

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

export default class VizComplexAndTable extends Component {
    state = {
      selectednode:[],
    }
    constructor(){
      super();
      this.setSelected = this.setSelected.bind(this);
    }
    /**
     * callback when node selected
     */
    setSelected(selectednode, clickSource){
      //console.log('doUpdate vertexes', vertexesResponse.data, edgesResponse.data);
      if (selectednode && selectednode.id && selectednode.name){
        if (this.state.selectednode[0] == undefined || this.state.selectednode[0].id != selectednode.id){
          this.setState(prevState => ({
            selectednode: [{
              'clickSource':clickSource,
              'id':selectednode.id,
              'name':selectednode.name,
              'category':selectednode.category
            }]
          }),() => { // console.log('hey', JSON.stringify(this.state))
                    });  
        }
      }
    }
    render(){
      const selectRow = {
        mode: 'radio', // single row selection
        // mode: 'checkbox',
        onSelect: (row, isSelect, rowIndex, e) => {
          console.log('click ', row);
          this.setSelected(row[0], 'table');
          // row: {id: "ib", category: "Cat", name: "ib", index: 8, x: 245.45121212454782, …}
          // if (SOME_CONDITION) {
          //   return false; to reject selection
          // }
        }
      };

      return (
        <div>
          <Row>
            <Col className="viscomplex"  id="viscomplex" lg={8} md={6} sm={6} xs={12} className="zmb-3">
            <VisComplex data={this.props.data} screenWidth={this.props.screenWidth}
              setSelected={this.setSelected} selectednode={this.state.selectednode} />
            </Col>
            <Col lg={4} md={6} sm={6} xs={12} className="zmb-3">
            {this.props.data != undefined && this.props.data.nodes != undefined ? 
              <div>
                <BootstrapTable keyField='id' data={ this.props.data.nodes } 
                  columns={ columnsReal } 
                  pagination={ paginationFactory() } selectRow={ selectRow }/>
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
        </div>); 
  }
}