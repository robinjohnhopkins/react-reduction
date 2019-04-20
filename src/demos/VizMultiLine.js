import React, { useEffect } from 'react';
import * as d3 from 'd3';

const VizMultiLine = (props) => {
    console.log('VizMultiLine ', props);
  useEffect(() => {
   d3.select('.viz > *').remove();
   draw(props)
 }, [props.shapes.length, props.exponent]); // inside [] is a list of prop changes that cause a redraw
  return <div className="viz" />
}

const draw = (props) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var margin = 50;
    var width = 1024;
    var height = 768;
    var exponent = props.exponent || 1;
    console.log('VizMultiLine exponent=', exponent);
    var cssText = 'border: 1px solid gray';
    var data = [{ date: "10/25/2018", value1: 1, value2: 0 },
    { date: "10/26/2018", value1: 3, value2: 0 },
    { date: "10/27/2018", value1: 0, value2: 25 },
    { date: "10/28/2018", value1: 0, value2: 62 },
    { date: "10/29/2018", value1: 5, value2: 5 },
    { date: "10/30/2018", value1: 8, value2: 37 },
    { date: "10/31/2018", value1: 7, value2: 12 },
    { date: "11/01/2018", value1: 11, value2: 55 },
    { date: "11/02/2018", value1: 23, value2: 44 },
    { date: "11/03/2018", value1: 13, value2: 53 },
    { date: "11/04/2018", value1: 15, value2: 18 },
    { date: "11/05/2018", value1: 37, value2: 12 },
    { date: "11/06/2018", value1: 32, value2: 60 },
    { date: "11/07/2018", value1: 38, value2: 60 },
    { date: "11/08/2018", value1: 42, value2: 60 },
    { date: "11/09/2018", value1: 43, value2: 3 },
    { date: "11/10/2018", value1: 21, value2: 3 },
    { date: "11/11/2018", value1: 24, value2: 2 },
    { date: "11/12/2018", value1: 50, value2: 15 },
    { date: "11/13/2018", value1: 53, value2: 3 },
    { date: "11/14/2018", value1: 59, value2: 15 },
    { date: "11/15/2018", value1: 61, value2: 3 },
    { date: "11/16/2018", value1: 62, value2: 19 }];


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
      ;
    var parseTime = d3.timeParse("%m/%d/%Y");

    data.forEach(function (d) {
        d.date = parseTime(d.date);
    });

    var x = d3.scaleTime()
        .domain(d3.extent(data, function (d) { return d.date; }))
        .range([0, width])
        ;

    // The scale changes depending on exponent
    // 1 is normal scale
    // less than 1 skews scale to emphasize lower range
    // more than one skews scale to emphasize upper range
    var y = d3.scalePow()
        .domain(d3.extent(data, function (d) { return d.value1 }))
        .range([height, 0])
        .exponent(exponent)
        ;
    var propertyNames = [];

    for (var name in data[0]) {
        if (name == "date") {
            continue;
        }
        propertyNames.push(name);
        console.log("Property: " + name);
    }

    var colors = d3.schemeCategory10;

    for (var i = 0; i < propertyNames.length; i++) {
        plotVariable(propertyNames[i], colors[i]);
    }

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

    var yAxis = d3.axisLeft(y)
        .tickFormat(d => y.tickFormat(62, d3.format(",d"))(d)
        );

    yAxis(yAxisGroup);

    function plotVariable(propertyName, color) {
        var line1 = d3.line()
            .x(d => x(d.date))
            .y(d => y(d[propertyName]))
            ;

        dataGroup.append("path")
            .data([data])
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("d", line1)
        }

  }
export default VizMultiLine





