import React, { Component } from 'react';
import Page from 'components/Page';
import Graph from 'react-sigma-graph';
import axios from 'axios'

export default class SigmaGraphPage extends Component {
  state = {
    data: {
        nodes: [
          { id: 'a', category: 'cat', name: 'Garfield' },
          { id: 'b', category: 'dog', name: 'Pluto' },
          { id: 'c', category: 'mouse', name: 'Ralph' },
        ],
        // edge labels and types are optional
        edges: [
          { source: 'a', target: 'b', label: 'friend', type: 'arrow' },
          { source: 'a', target: 'c', label: 'enemy', type: 'arrow' },
          { source: 'b', target: 'c', label: 'ambivalent', type: 'arrow' }
        ]
      },
      // optional color definition, defaults to d3 category10 based on domain of categories in data
    categoryColors : {
        'cat': '#1f77b4',
        'dog': '#ff7f0e'
      }
    };
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

  render() {
    return (
      <Page
        className="SigmaGraphPage"
        title="SigmaGraphPage"
        breadcrumbs={[{ name: 'SigmaGraphPage', active: true }]}
      >
        <Graph data={this.state.data} categoryColors={this.state.categoryColors} />
      </Page>
    );
  }
};
