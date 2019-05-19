import React, { useEffect } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';

// Bubble chart with d3-force based on following with mouse click and drag added and play with colors etc
//https://blockbuilder.org/alex1221/42ae2ddf18a7607d15a0ce4308963c4f
const VizBubbles = (props) => {
  useEffect(() => {
   d3.select('.viz > *').remove();
   draw(props)
 }, [props.screenWidth])
  return <div className="viz" />
}

const draw = (props) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = 7/10 * Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    
  // location to centre the bubbles
  const centre = { x: w/2, y: h/2 };

  // strength to apply to the position forces
  const forceStrength = 0.03;

  // these will be set in createNodes and chart functions
  //let svg = null;
  let bubbles = null;
  let labels = null;
  //let nodes = [];

  var svg = d3.select('.viz').append('svg')
    .attr('height', h)
    .attr('width', w)
    .attr('id', 'svg-viz')
  console.log('width, height',w,h);

  // charge is dependent on size of the bubble, so bigger towards the middle
  function charge(d) {
    return Math.pow(d.radius, 2.0) * 0.01
  }

  // create a force simulation and add forces to it
  const simulation = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(charge))
    // .force('center', d3.forceCenter(centre.x, centre.y))
    .force('x', d3.forceX().strength(forceStrength).x(centre.x))
    .force('y', d3.forceY().strength(forceStrength).y(centre.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1));

  // force simulation starts up automatically, which we don't want as there aren't any nodes yet
  simulation.stop();

  // set up colour scale
  // eslint-disable-next-line
  const fillColour = d3.scaleOrdinal()
  	.domain(["1", "2", "3", "5", "99"])
    .range(["#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#AAAAAA"]);

  // data manipulation function takes raw data from csv and converts it into an array of node objects
  // each node will store data and visualisation values to draw a bubble
  // rawData is expected to be an array of data objects, read in d3.csv
  // function returns the new node array, with a node for each element in the rawData input
  function createNodes(rawData) {
    // use max size in the data as the max in the scale's domain
    // note we have to ensure that size is a number
    const maxSize = d3.max(rawData, d => +d.size);

    // size bubbles based on area
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxSize])
      .range([0, 80])

    // use map() to convert raw data into node data
    const myNodes = rawData.map(d => ({
      ...d,   // spread operator
      radius: radiusScale(+d.size),
      size: +d.size,      // + operator returns the numeric representation of the object
      x: Math.random() * 900,
      y: Math.random() * 800,
      // t in the range [0,1], returns the corresponding color from a 180° rotation of 
      // Niccoli’s perceptual rainbow, represented as an RGB string. interpolateWarm
      color:d3.interpolateCool(Math.random())
    }))

    return myNodes;
  }
  
  function dragstarted(d) {
    // in debugger we see something like this as local variables!
    // d: {id: 9, groupid: 8, size: 5555, radius: 62.573305028603386,
    //     x: 529.4541354464313, y: 210.4677665872355, fx: null, fy: null,
    //     index: 4, vx: 0.0003892188339644698,vy: -0.002188908821096062
    //this: circle
    if (!d3.event.active){
      simulation.alphaTarget(0.3).restart();
    } 
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
  }

  function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
  } 
  var upperLimit = 200; // 50
  const radius = d3.scaleSqrt().domain([0, upperLimit]).range([0, 80])
  console.log('radius', radius);

  const radiusx = scaleLinear();
  console.log('radiusx', radiusx(1), radiusx(10), radiusx(0.5), radiusx(100));
  // radiusx 1 10 0.5 100 - the input range is equal to the output range

  const linear = scaleLinear()
    .domain([0, 200])
    .range([0, 100]);
  
  const mid = linear(100);
  console.log(mid, linear(0),linear(200), linear(201), linear(401), linear(2000));
  // The input range [0, 200] is mapped to output range [0,100] - which halves the input.
  // 50 0 100 100.49999999999999 200.5 1000
    
  // sqrt is shorthand for scalePow().exponent(0.5)
  const sqrt = d3.scaleSqrt()
    .domain([0, 10])
    .range([0, 100]);
  // the square root of 10 (~3.16) will map to 100
  // the square root of 9 (3) is ~94.9% of the square root of 10
  // so it will map to ~94.9
  console.log('sqrt',sqrt(10),sqrt(9),sqrt(4),sqrt(1));
  // sqrt 100 94.86832980505137 63.245553203367585 31.622776601683793

  // An array of ten categorical colors represented as RGB hexadecimal strings.
  var color = d3.schemeCategory10;//["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
  console.log('color', color);

  var n = 10,m = 10;

  var nodes = d3.range(n).map(function() {
    var i = Math.floor(Math.random() * m),
        v = (i + 1) / m * -Math.log(Math.random());
    return {
      radius: radius(v),
      color: color[i],
      v:v,
      size:v*m,
    };
  });
  var rawData = [
    {id: 0, groupid:1, size:2820},
    {id: 1, groupid:1, size:9080},
    {id: 2, groupid:3, size:4610},
    {id: 3, groupid:2, size:3810},
    {id: 4, groupid:1, size:2990},
    {id: 5, groupid:4, size:3333},
    {id: 6, groupid:5, size:4444},
    {id: 7, groupid:6, size:2222},
    {id: 8, groupid:7, size:7777},
    {id: 9, groupid:8, size:5555},
  ];

  nodes = createNodes(rawData);
  console.log('nodes', nodes);

  // bind nodes data to circle elements
  const elements = svg.selectAll('.bubble')
    .data(nodes, d => d.id)
    .enter()
    .append('g')

  bubbles = elements
    .append('circle')
    .classed('bubble', true)
    .attr('r', d => d.radius)
    .attr('fill', d => d.color)
//      .attr('fill', d => fillColour(d.groupid))
    .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended)); 

  // labels
  labels = elements
    .append('text')
    .attr('dy', '.3em')
    .style('text-anchor', 'middle')
    .style('font-size', 10)
    .text(d => d.id)
  
  // set simulation's nodes to our newly created nodes array
  // simulation starts running automatically once nodes are set
  simulation.nodes(nodes)
    .on('tick', ticked)
    .restart();

  // callback function called after every tick of the force simulation
  // here we do the actual repositioning of the circles based on current x and y value of their bound node data
  // x and y values are modified by the force simulation
  function ticked() {
    bubbles
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)

    labels
      .attr('x', d => d.x)
      .attr('y', d => d.y)
  }

}
export default VizBubbles