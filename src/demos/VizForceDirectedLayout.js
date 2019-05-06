import React, { useEffect } from "react";
import * as d3 from 'd3';

var cssText = "position: absolute; max-width: 400px; height: auto;padding: 5px; background-color: white; -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;-webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);-moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4); box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4); pointer-events: none; font: 12px sans-serif;";
// NB above cssText is as per style below
// .hovercard {
//   position: absolute;
//   max-width: 400px;
//   height: auto;
//   padding: 5px;
//   background-color: white;
//   -webkit-border-radius: 5px;
//   -moz-border-radius: 5px;
//   border-radius: 5px;
//   -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
//   -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
//   box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
//   pointer-events: none;
//   font: 12px sans-serif;
// }

const VizForceDirectedLayout = (props) => {
  useEffect(() => {
   d3.select('.viz > *').remove();
   draw(props)
 }, [props.data, props.screenWidth])
  return <div className="viz" />
}

const draw = (props) => {
  var nodes = [
    { "name": "Alan Shepard", "nodeType": "A" },
    { "name": "Freedom 7", "nodeType": "M", "program": "Mercury" },
    { "name": "Gus Grissom", "nodeType": "A" },
    { "name": "Liberty Bell 7", "nodeType": "M", "program": "Mercury" },
    { "name": "Friendship 7", "nodeType": "M", "program": "Mercury" },
    { "name": "John Glenn", "nodeType": "A" },
    { "name": "Aurora 7", "nodeType": "M", "program": "Mercury" },
    { "name": "Scott Carpenter", "nodeType": "A" },
    { "name": "Sigma 7", "nodeType": "M", "program": "Mercury" },
    { "name": "Wally Schirra", "nodeType": "A" },
    { "name": "Faith 7", "nodeType": "M", "program": "Mercury" },
    { "name": "Gordon Cooper", "nodeType": "A" },
    { "name": "Molly Brown", "nodeType": "M", "program": "Gemini" },
    { "name": "John Young", "nodeType": "A" },
    { "name": "Gemini 4", "nodeType": "M", "program": "Gemini" },
    { "name": "James McDivitt", "nodeType": "A" },
    { "name": "Edward White", "nodeType": "A" },
    { "name": "Gemini 5", "nodeType": "M", "program": "Gemini" },
    { "name": "Pete Conrad", "nodeType": "A" },
    { "name": "Gemini 7a", "nodeType": "M", "program": "Gemini" },
    { "name": "Thomas Stafford", "nodeType": "A" },
    { "name": "Gemini 8", "nodeType": "M", "program": "Gemini" },
    { "name": "Neil Armstrong", "nodeType": "A" },
    { "name": "David Scott", "nodeType": "A" },
    { "name": "Gemini 9a", "nodeType": "M", "program": "Gemini" },
    { "name": "Eugene Cernan", "nodeType": "A" },
    { "name": "Gemini 10", "nodeType": "M", "program": "Gemini" },
    { "name": "Michael Collins", "nodeType": "A" },
    { "name": "Gemini 11", "nodeType": "M", "program": "Gemini" },
    { "name": "Richard Gordon", "nodeType": "A" },
    { "name": "Gemini 12", "nodeType": "M", "program": "Gemini" },
    { "name": "James Lovell", "nodeType": "A" },
    { "name": "Edwin Aldrin", "nodeType": "A" }
];

var links = [
    { "source": "Freedom 7", "target": "Alan Shepard" },
    { "source": "Liberty Bell 7", "target": "Gus Grissom" },
    { "source": "Friendship 7", "target": "John Glenn" },
    { "source": "Aurora 7", "target": "Scott Carpenter" },
    { "source": "Sigma 7", "target": "Wally Schirra" },
    { "source": "Faith 7", "target": "Gordon Cooper" },
    { "source": "Molly Brown", "target": "Gus Grissom" },
    { "source": "Molly Brown", "target": "John Young" },
    { "source": "Gemini 4", "target": "James McDivitt" },
    { "source": "Gemini 4", "target": "Edward White" },
    { "source": "Gemini 5", "target": "Gordon Cooper" },
    { "source": "Gemini 5", "target": "Pete Conrad" },
    { "source": "Gemini 7a", "target": "Wally Schirra" },
    { "source": "Gemini 7a", "target": "Thomas Stafford" },
    { "source": "Gemini 8", "target": "Neil Armstrong" },
    { "source": "Gemini 8", "target": "David Scott" },
    { "source": "Gemini 9a", "target": "Thomas Stafford" },
    { "source": "Gemini 9a", "target": "Eugene Cernan" },
    { "source": "Gemini 10", "target": "John Young" },
    { "source": "Gemini 10", "target": "Michael Collins" },
    { "source": "Gemini 11", "target": "Pete Conrad" },
    { "source": "Gemini 11", "target": "Richard Gordon" },
    { "source": "Gemini 12", "target": "James Lovell" },
    { "source": "Gemini 12", "target": "Edwin Aldrin" }
];
if (props.data){
  //console.log('props.data ', props.data);
  nodes = props.data.nodes;
  links = props.data.edges;
} else {
  console.log('NOT props.data ');
}

// get outer w,h for ratio, get div width and calc height by preserving ratio
const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var viz = d3.select('.viz')
var containerWidth = viz.style('width').slice(0, -2)  // float
var containerHeight = containerWidth * h / w;         // preserve ratio of outer window
var width = parseInt(containerWidth)
var height = parseInt(containerHeight)
console.log('width height ',w ,h, containerWidth, width, height);

var svg = d3.select('.viz').append('svg')
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

// add hovercard
var hovercard = d3.select('body').append('div')
      .attr('class', 'hovercard')
      .style('opacity', 0)
      .style('width', 400)
      .attr('style', cssText);

var simulation = d3.forceSimulation().nodes(nodes);

// set up the forces
var link = d3.forceLink(links).id(function (d) { return d.name; }).distance(50).strength(1);
var charge = d3.forceManyBody().strength(-100);
var forceX = d3.forceX().x(width / 2).strength(.05);
var forceY = d3.forceY().y(height / 2).strength(.05);

// apply the forces
simulation
    .force("link", link)        // add link lines as a force
    .force("charge", charge)    // negative gravity charge forces nodes to separate from each other
    .force("forceX", forceX)    // e.g. 0.5 is much greater force and groups tighter horizontally
    .force("forceY", forceY)    // similar for y concentration
    ;

//add tick instructions:
simulation.on("tick", simulation_tick); // gives results of foces to nodes and allows us to apply that to our layout

var link = g
    .selectAll("line")
    .data(links)            // link array
    .enter()
    .append("line")
    .attr("stroke-width", 2)
    .attr("stroke", "#ddd");
var setSelected = props.setSelected;

//group the nodes together for easier ticking
var node = g.selectAll("g")
    .data(nodes)
    .enter()
    .append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragStart)
        .on("drag", dragDone)
    )
    .on("click", selectNodeClick );

// add the node circle with the specific colors and radius
node
    .append("circle")
    .attr("r", radius)
    .attr("fill", fillColor);

function radius(d) {
  if (d.nodeType == undefined) {
    return 2;
  } else {
    if (d.nodeType && d.nodeType == "A") {
      return 10;
  } else {
    if (d.program && d.program == "Mercury") {
            return 15;
        }
        else {
            return 24;
        }
    }
  }
}

function fillColor(d) {
  if (d.nodeType == "A") {
      return "#FC3D21";
  } else {
      return "#0B3D91";
  }
}

// call parent callback to inform selected
// reset all nodes to default, style selected node as clicked
function selectNodeClick(d) {
  //console.log('node click',d, nodes.length);
  setSelected(d);
  node.style("fill",fillColor(node))
      .style("stroke",null)
      .attr('r', null);

  d3.select(this).attr('r', 25)
      .style("fill","lightcoral")
      .style("stroke","red");
}

// add the name label
node
    .append("text")
    .attr("font-family", "Arial")
    .attr("font-size", "8pt")
    .attr("dx", "-30")
    .attr("style", "fill:white;fill-opacity:1;stroke:#444444;stroke-width:.5px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;")
    .text(function (d) { return d.name });
    // above styling is white text with black outline
    
// attach the zoom handler
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);

//Zoom functions
function zoom_actions() {
    g.attr("transform", d3.event.transform)
}

function dragStart(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
}

function dragDone(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function simulation_tick() {
    link    // collection of all link elements
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; });

    node    // collection of all node elements
            // g elements do not have x y coordinates
            // instead we need to apply a transform as calculated by the simulation
        .attr("transform", function (d) { return "translate(" + d.x + ", " + d.y + ")"; });

    link.on('mouseover', function(d) {
           
          hovercard.transition()
               .duration(100)
               .style('opacity', 1);
        
          var info = {
            label: d.label,
            type: d.type,
            source:{
              name: d.source.name,
              category: d.source.category,
              id: d.source.id,
            }, 
            target:{
              name: d.target.name,
              category: d.target.category,
              id: d.target.id,
            },
          };
          var tip = 
               '<div><h2>link info</h2><div>' + JSON.stringify(info) + '</div></div>';

          // This is the info in d that is used
          //  index: 7
          //  label: "Cat"
          //  source: {id: "fb", category: "Cat", name: "fb", index: 5, x: 1060.5768978336328, …}
          //  target: {id: "gb", category: "Dog", name: "gb", index: 6, x: 1012.5837557247899, …}
          //  type: "arrow"

           hovercard.html(tip)
               .style('left', d3.event.pageX + 'px')
               .style('top', d3.event.pageY + 'px');
           // console.log('hover link', d);
       });
       
       link.on('mouseout', function(d) {
           
           hovercard.transition()
               .duration(100)
               .style('opacity',0);
       });
}

  }
export default VizForceDirectedLayout





