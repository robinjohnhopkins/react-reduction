import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import Page from 'components/Page';
import { treeData } from 'demos/D3TreePage';

const containerStyles = {
  width: '90%',
  height: '80vh',
}

export default class D3TreePage extends Component {
//export default class D3TreePage extends React.PureComponent {
    state = {}
  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2
      }
    });
  }
  render() {
    return (
      <Page
        className="D3TreePage"
        title="D3Tree"
        breadcrumbs={[{ name: 'D3Tree', active: true }]}
      >
      <div className="controller">
        <div id="treeWrapper" ref={tc => (this.treeContainer = tc)}
          style={containerStyles}>
          <Tree 
              data={treeData} 
              translate={this.state.translate} 
              orientation={'vertical'} />
        </div>
      </div>
      </Page>
    );
  }
};
