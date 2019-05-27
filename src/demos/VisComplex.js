import React, { useEffect } from "react";
import vis from 'vis/dist/vis';
import 'vis/dist/vis.css';
import { sampleEdgesData, sampleNodesData } from "./VisComplexData";


// See http://visjs.org - for getting started with most excellent visjs
// See https://www.kenedict.com/connecting-startups-and-investors-in-mobile-technology/
// for visjs complex network example using visjs version 3.1.0
// transformed below

//var cssText = "width: 800px; height: auto;border: 0px solid lightgray;";
// NB above cssText is as per style below
// #mynetwork {
//   width: 800px;
//   height: 800px;
//   border: 0px solid lightgray;
// }
// var mynetwork = {
//   width: '800px',
//   height: '800px',
//   border: '0px solid lightgray',
// }


const VisComplex = (props) => {

  // get outer w,h for ratio, get div width and calc height by preserving ratio
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
 
  var containerWidth = document.getElementById("d3page").offsetWidth * 2/3;
  var containerHeight = containerWidth * 0.9 * h / w;         // preserve ratio of outer window
  var width = parseInt(containerWidth)
  var height = parseInt(containerHeight)
  console.log('width height ',w ,h, containerWidth, width, height);
  var mynetwork = {
    width: width,
    height: height,
    border: '0px solid lightgray',
  }
  if (props.selectednode && props.selectednode[0] && props.selectednode[0].id){
    var nodeId = props.selectednode[0].id;
    var positions = network.getPositions(nodeId);
    console.log('positions', positions); // db: {x: -1059, y: -1699}

    //var zoomLevel = .9;
    //network.focusOnNode(nodeId, zoomLevel);3.x function
    //network.focusOnNode(nodeId); 3.x function

    // possibly useful 4.x functions
    //Network.prototype.findNode returns cluster of nodes including given node
    //Network.prototype.moveTo
    //Network.prototype.getBoundingBox
    //Network.prototype.getConnectedNodes = function (objectId)
    //Network.prototype.getConnectedEdges
    //Network.prototype.startSimulation 
    //Network.prototype.stopSimulation
    //Network.prototype.getScale
    //Network.prototype.getViewPosition 
    //Network.prototype.getPositions
    //var cluster = network.findNode(nodeId);
    //console.log('cluster', cluster);
    var scale = 0.5;
    var offsetx = 0.5, offsety = 0.5;
    var positionx = positions[nodeId].x, positiony = positions[nodeId].y;
    // zoom out to fit
    var options = {offset: {x:0,y:0},
        scale: 1.0,
        duration: 1000, //ms
        easingFunction: 'easeInOutQuad'
    };
    network.fit({animation:options});
    // hold at zoomed out for a fraction then zoom in - nice
    setTimeout(()=>{
        var options = {
            position: {x:positionx,y:positiony},
            scale: scale,
            offset: {x:offsetx,y:offsety},
            animation: true // default duration is 1000ms and default easingFunction is easeInOutQuad.
          };
          network.moveTo(options);
    }, 1200);

  }
  useEffect(() => {

   draw(props)
 }, [props.data, props.screenWidth])
  return <div className="viz"  id="viz" style={mynetwork} >hey</div>
}

var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var network = null;

const draw = (props) => {
    console.log('VisComplex draw');

    nodes.clear();
    edges.clear();
    // create an array with nodes
    var  nodesData = sampleNodesData;
    // create an array with edges
    var edgesData = sampleEdgesData;
    
    if (props.data && props.data.nodes){
        nodesData = props.data.nodes;
    }
    if (props.data && props.data.edges){
        edgesData = props.data.edges;
    }
    // create a network
    nodes.add(nodesData);
    edges.add(edgesData);

    var container = document.getElementById('viz');
    var data = {
        nodes: nodes,
        edges: edges
    };
    // "vis": "^4.21.0" options
    // see node_modules/vis/dist/vis.js (28826) for options
    var options = {
        nodes: {
            borderWidth: 0.5,
            //radiusMin: 5,// 3.1 option
            //radiusMax: 50,// 3.1 option
            //fontSize: 12,// 3.1 option
            //fontFace: "Tahoma",// 3.1 option
            font: {
              size: 12, // px
              face: 'Tahoma',
            },
        },
        edges: {
            width: 0.2,
                //inheritColor: "from",
            color:{inherit:"from"},
            //style: "line",// 3.1 option
            //widthSelectionMultiplier: 8,// 3.1 option
            smooth: {
                enabled: false,
            }
            //hoverWidth: function (width) {return width+1;}
        },
        // tooltip: { // 3.1 option
        //     delay: 200,
        //     fontSize: 12,
        //     color: {
        //         background: "#fff"
        //         }
        // },
        // tooltip: { boolean: bool, 'function': 'function' }, << this is new tooltip option
        // smoothCurves: {// 3.1 option
        //     enabled: false,
        //     dynamic: false,
        //     type: "continuous",
        //     roundness: 0.5
        // },
        // dynamicSmoothCurves: false,// 3.1 option
        // stabilize: false,// 3.1 option
        physics: {barnesHut: {gravitationalConstant: -80000, springConstant: 0.001, springLength: 200},
            stabilization: {
                enabled:true,
                iterations:50,
                updateInterval: 25,
                onlyDynamicEdges: false,
                fit: true
            },
            enabled:true,
            //damping:0.1,// 3.1 option
            },
        // stabilizationIterations: 100,  // 3.1 option maximum number of iteration to stabilize
        // hideEdgesOnDrag: true// 3.1 option
        interaction: {
            hideEdgesOnDrag: true
        }
    };
    var setSelected = props.setSelected;
    network = new vis.Network(container, data, options);                       // hz (fps)
    network.on("click",onClick);
    
    // network.on("stabilizationProgress", function(params) {
    //     var maxWidth = 496;
    //     var minWidth = 20;
    //     var widthFactor = params.iterations/params.total;
    //     var width = Math.max(minWidth,maxWidth * widthFactor);

    //     document.getElementById('bar').style.width = width + 'px';
    //     document.getElementById('text').innerHTML = Math.round(widthFactor*100) + '%';
    // });
    // network.once("stabilizationIterationsDone", function() {
    //     document.getElementById('text').innerHTML = '100%';
    //     document.getElementById('bar').style.width = '496px';
    //     document.getElementById('loadingBar').style.opacity = 0;
    //     // really clean the dom element
    //     setTimeout(function () {document.getElementById('loadingBar').style.display = 'none';}, 500);
    // });

    function onClick(selectedItems) {
        var nodeId;
        var degrees = 2;
        // we get all data from the dataset once to avoid updating multiple times.
        var allNodes = nodes.get({returnType:"Object"});
        if (selectedItems.nodes.length === 0) {
            // restore on unselect
            for (nodeId in allNodes) {
                if (allNodes.hasOwnProperty(nodeId)) {
                    allNodes[nodeId].color = undefined;
                    if (allNodes[nodeId].oldLabel !== undefined) {
                        allNodes[nodeId].label = allNodes[nodeId].oldLabel;
                        allNodes[nodeId].oldLabel = undefined;
                    }
                    allNodes[nodeId]['levelOfSeperation'] = undefined;
                    allNodes[nodeId]['inConnectionList'] = undefined;
                }
            }
        }
        else {
            var allEdges = edges.get();

            // we clear the level of seperation in all nodes.
            clearLevelOfSeperation(allNodes);

            // we will now start to collect all the connected nodes we want to highlight.
            var connectedNodes = selectedItems.nodes;

            // { edges: (3) ["e4abe8cf-c002-c299-ec7b-612a327d22fa", "701e5e56-e935-9e24-b3db-4d0556bd8fef", "96e177ca-1699-1d6b-eff-e41c409263d"]
            //   nodes: (9) ["fb", "gb", "dc", "pb", "db", "ac", "nb", "bb", "cc"]
            // } zeroth node is one clicked
            console.log(selectedItems);
            var selectedNode = selectedItems.nodes[0];
            var detailedNode = allNodes[selectedNode];
            setSelected(detailedNode, 'graph');

            // we can store them into levels of seperation and we could then later use
            // this to define a color per level
            // any data can be added to a node, this is just stored in the nodeObject.
            storeLevelOfSeperation(connectedNodes,0, allNodes);
            for (var i = 1; i < degrees + 1; i++) {
                appendConnectedNodes(connectedNodes, allEdges);
                storeLevelOfSeperation(connectedNodes, i, allNodes);
            }
            for (nodeId in allNodes) {
                if (allNodes.hasOwnProperty(nodeId)) {
                    if (allNodes[nodeId]['inConnectionList'] === true) {
                        if (allNodes[nodeId]['levelOfSeperation'] !== undefined) {
                            if (allNodes[nodeId]['levelOfSeperation'] >= 2) {
                                allNodes[nodeId].color = 'rgba(150,150,150,0.75)';
                            }
                            else {
                                allNodes[nodeId].color = undefined;
                            }
                        }
                        else {
                            allNodes[nodeId].color = undefined;
                        }
                        if (allNodes[nodeId].oldLabel !== undefined) {
                            allNodes[nodeId].label = allNodes[nodeId].oldLabel;
                            allNodes[nodeId].oldLabel = undefined;
                        }
                    }
                    else {
                        allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
                        if (allNodes[nodeId].oldLabel === undefined) {
                            allNodes[nodeId].oldLabel = allNodes[nodeId].label;
                            allNodes[nodeId].label = "";
                        }
                    }
                }
            }
        }
        var updateArray = [];
        for (nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
                updateArray.push(allNodes[nodeId]);
            }
        }
        nodes.update(updateArray);
    }


    /**
     * update the allNodes object with the level of seperation.
     * Arrays are passed by reference, we do not need to return them because we are working in the same object.
     */
    function storeLevelOfSeperation(connectedNodes, level, allNodes) {
        for (var i = 0; i < connectedNodes.length; i++) {
            var nodeId = connectedNodes[i];
            if (allNodes[nodeId]['levelOfSeperation'] === undefined) {
                allNodes[nodeId]['levelOfSeperation'] = level;
            }
            allNodes[nodeId]['inConnectionList'] = true;
        }
    }

    function clearLevelOfSeperation(allNodes) {
        for (var nodeId in allNodes) {
            if (allNodes.hasOwnProperty(nodeId)) {
                allNodes[nodeId]['levelOfSeperation'] = undefined;
                allNodes[nodeId]['inConnectionList'] = undefined;
            }
        }
    }

    /**
     * Add the connected nodes to the list of nodes we already have
     *
     *
     */
    function appendConnectedNodes(sourceNodes, allEdges) {
        var tempSourceNodes = [],i;
        // first we make a copy of the nodes so we do not extend the array we loop over.
        for (i = 0; i < sourceNodes.length; i++) {
            tempSourceNodes.push(sourceNodes[i])
        }

        for (i = 0; i < tempSourceNodes.length; i++) {
            var nodeId = tempSourceNodes[i];
            if (sourceNodes.indexOf(nodeId) === -1) {
                sourceNodes.push(nodeId);
            }
            addUnique(getConnectedNodes(nodeId, allEdges),sourceNodes);
        }
        tempSourceNodes = null;
    }

    /**
     * Join two arrays without duplicates
     * @param fromArray
     * @param toArray
     */
    function addUnique(fromArray, toArray) {
        for (var i = 0; i < fromArray.length; i++) {
            if (toArray.indexOf(fromArray[i]) === -1) {
                toArray.push(fromArray[i]);
            }
        }
    }

    /**
     * Get a list of nodes that are connected to the supplied nodeId with edges.
     * @param nodeId
     * @returns {Array}
     */
    function getConnectedNodes(nodeId, allEdges) {
        var edgesArray = allEdges;
        var connectedNodes = [];

        for (var i = 0; i < edgesArray.length; i++) {
            var edge = edgesArray[i];
            if (edge.to === nodeId) {
                connectedNodes.push(edge.from);
            }
            else if (edge.from === nodeId) {
                connectedNodes.push(edge.to)
            }
        }
        return connectedNodes;
    }
}
export default VisComplex;