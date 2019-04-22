import React, { Component } from 'react';
import Page from 'components/Page';
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

export default class SigmaPage extends Component {
  state = {
    data: {
      nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], 
      edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]
    }
  }

  render() {
    return (
      <Page
        className="SigmaPage"
        title="SigmaPage"
        breadcrumbs={[{ name: 'SigmaPage', active: true }]}
      >
    <Sigma graph={this.state.data} settings={{drawEdges: true, clone: false}}>
      <RelativeSize initialSize={15}/>
      <RandomizeNodePositions/>
    </Sigma>
      </Page>
    );
  }
};
