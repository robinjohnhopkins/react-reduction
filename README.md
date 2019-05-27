# [React Reduction - Free Admin Template Built with React and Bootstrap4](https://reduction-admin.github.io/react-reduction/)

![React Reduction](public/img/screenshots/reduction-admin.jpg?raw=true 'React Reduction')

## Preview

You can check out [live preview](https://reduction-admin.github.io/react-reduction/).

## Note to self
master remains as per original.
branch d3 has playing arounds including awesome d3 and vis.js example pages.
The d3 samples will work standalone. But if you have run the ~/workspace/vertex
java app, it will pick up data from there! Sweet.

## Quick Start

1.  Clone the repo `git clone https://github.com/reduction-admin/react-reduction.git`
2.  Go to your project folder from your terminal
3.  Run: `npm install` or `yarn install`
4.  After install, run: `npm run start` or `yarn start`
5.  It will open your browser(http://localhost:3000)

## Note

React Reduction is built on top of [Create React App](https://github.com/facebook/create-react-app), which means all features that create-react-app supports are available.

To enable basic Google Analytics page tracking, you can add "REACT_APP_GOOGLE_ANALYTICS" variable in .env(or create env.production) file. For example, `REACT_APP_GOOGLE_ANALYTICS=xxxxxx` like this.

## More Bootstrap Themes

If you want more premium or free React Bootstrap themes, you can get it [here](https://flatlogic.com/admin-dashboards?ref=w7yTz44arn)

[![Flat Logic](public/img/screenshots/flatlogic.com_admin-dashboards_react.png)](https://flatlogic.com/admin-dashboards?ref=w7yTz44arn)

# d3

added d3 page following this tutorial, which keeps react and d3 cleanly separate.

https://towardsdatascience.com/react-d3-the-macaroni-and-cheese-of-the-data-visualization-world-12bafde1f922

# visjs

```
npm install vis
```

gives:

```
    "vis": "^4.21.0"
```

But the complex vis demo found is `@version 3.1.0`

wherein you need data like this:

```
  var  nodesData = [
        {id: 1, label: 'Fastback Networks', title: '<b>Fastback Networks</b> <br><br>' + 'Country: ' + 'USA' + '<br>' + 'City: ' + 'San Jose', value: 0.00561886500819588, group: 47, x: -405.378, y: 494.57608, shape: 'dot'},
        {id: 2, label: 'Benchmark Capital / Balderton Capital', title: '<b>Benchmark Capital / Balderton Capital</b> <br><br>' + 'Country: ' + 'No data' + '<br>' + 'City: ' + 'No data', value: 0, group: 160, x: 240.62976, y: 688.2266, shape: 'square'},
```

you need edges data like this:

```
    var edgesData = [
        {from: 1, to: 23},
        {from: 1, to: 223},
```

Other than that, it produces an impressive network graph with grouping and highlighting that causes non-selected nodes to grey.
With circle and square nodes of different widths to visually show important nodes.
Nodes have mouse over tooltips.

Updated to "vis": "^4.21.0". See VisComplex.js to see how the options need changing.
Also ```network.moveTo``` is called rather than ```network.focusOnNode(nodeId)```.

## merge single file from master to branch d3
```
git checkout d3
git checkout --patch master  README.md
```