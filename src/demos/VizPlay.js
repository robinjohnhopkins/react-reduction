import React, { useEffect } from 'react';
import * as d3 from 'd3';

const VizPlay = (props) => {
  useEffect(() => {
   d3.select('.viz > *').remove();
   draw(props)
 }, [])  // [] was [props.shapes.length] previously a redraw check 
  return <div className="viz" />
}

const draw = (props) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var margin = 50;
    var width = 1024;
    var height = 768;
    var cssText = 'border: 1px solid gray';
    var data = [{ date: "10/25/2018", value: 1 },
    { date: "10/26/2018", value: 3 },
    { date: "10/27/2018", value: 0 },
    { date: "10/28/2018", value: 0 },
    { date: "10/29/2018", value: 5 },
    { date: "10/30/2018", value: 8 },
    { date: "10/31/2018", value: 7 },
    { date: "11/01/2018", value: 11 },
    { date: "11/02/2018", value: 23 },
    { date: "11/03/2018", value: 13 },
    { date: "11/04/2018", value: 15 },
    { date: "11/05/2018", value: 37 },
    { date: "11/06/2018", value: 32 },
    { date: "11/07/2018", value: 38 },
    { date: "11/08/2018", value: 42 },
    { date: "11/09/2018", value: 43 },
    { date: "11/10/2018", value: 21 },
    { date: "11/11/2018", value: 24 },
    { date: "11/12/2018", value: 50 },
    { date: "11/13/2018", value: 53 },
    { date: "11/14/2018", value: 59 },
    { date: "11/15/2018", value: 61 },
    { date: "11/16/2018", value: 62 }];

    var dataGroup = d3.select('.viz').append('svg')
      .attr('height', height + 2 * margin)
      .attr('width', width + margin)
      .attr('id', 'svg-viz')
      .attr('style', cssText)
      .append('g')
      .attr('transform', 'translate(' + margin + ', ' + margin + ')');

    console.log('width, height',w,h, width ,height);
    var line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value))
        .curve(d3.curveLinear)
        //.curve(d3.curveStepBefore)
        //.curve(d3.curveStepAfter)
        ;
    var line2 = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
//        .curve(d3.curveBasis)     // doesn't necessarily hit point
//        .curve(d3.curveCardinal)    // does hit points
          .curve(d3.curveMonotoneX)    // does hit points, closest to linear smoothing
        ;
          
      var parseTime = d3.timeParse("%m/%d/%Y");

      data.forEach(function (d) {
          d.date = parseTime(d.date);
      });

      var x = d3.scaleTime()
          .domain(d3.extent(data, function (d) { return d.date; }))
          .range([0, width])
          ;

      var y = d3.scaleLinear()
          .domain(d3.extent(data, function (d) { return d.value }))
          .range([height, 0])
          ;

      dataGroup.append("path")
          .data([data])
          .attr("fill", "none")
          .attr("stroke", "blue")
          .attr("d", line)

      dataGroup.append("path")
              .data([data])
              .attr("fill", "none")
              .attr("stroke", "red")
              .attr("d", line2)

      var xAxisGroup = dataGroup
          .append("g")
          .attr("class", "xAxisGroup")
          .attr("transform", "translate(0," + height + ")")

      var xAxis = d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%Y-%m-%d"));

      xAxis(xAxisGroup);

      var yAxisGroup = dataGroup
          .append("g")
          .attr("class", "yAxisGroup")

      var yAxis = d3.axisLeft(y);

      yAxis(yAxisGroup);

  }
export default VizPlay





