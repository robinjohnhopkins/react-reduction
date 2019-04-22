import React, { Component } from 'react';
import Page from 'components/Page';
import Graph from 'react-sigma-graph';

export default class SigmaGraphPage extends Component {
  state = {
    data: {
        nodes: [
          { id: 'a', category: 'cat', name: 'Garfield' },
          { id: 'b', category: 'dog', name: 'Pluto' }
        ],
        // edge labels and types are optional
        edges: [
          { source: 'a', target: 'b', label: 'friend', type: 'arrow' }
        ]
      },
      // optional color definition, defaults to d3 category10 based on domain of categories in data
    categoryColors : {
        'cat': '#1f77b4',
        'dog': '#ff7f0e'
      }
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
