import React, { useEffect } from 'react';
import * as d3 from 'd3';

const VizFancy = (props) => {
    console.log('VizFancy ', props);
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
    console.log('VizFancy exponent=', exponent);
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
        .exponent(exponent).nice()  // this pushes the scale at top of y to make it nicer!
        ;                           // so instead of y going upto say 62, it will go up to 65
    var propertyNames = [];
    for (var name in data[0]) {
        if (name == "date") {
            continue;
        }
        propertyNames.push(name);
        console.log("Property: " + name);
    }
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
        .tickFormat(d3.timeFormat("%Y-%m-%d"))
        .tickSize(10); // default 6

    xAxis(xAxisGroup);

    var yAxisGroup = dataGroup
        .append("g")
        .attr("class", "yAxisGroup")

    var yAxis = d3.axisLeft(y)
        .tickFormat(d => y.tickFormat(62, d3.format(",d"))(d)
        );

    yAxis(yAxisGroup);
    drawGridlines();
    circlePoints(propertyNames, dataGroup);
    drawLegend(propertyNames, dataGroup);

    d3.selectAll(".xAxisGroup .tick text")
        .attr("transform", "rotate(-15)");

    function drawGridlines() {
        var yGridlines = d3.axisLeft(y)
            .ticks(30)
            .tickFormat("")
            .tickSize(-width)

        var gridy = dataGroup.append("g")
            .attr("class", "grid")
            .call(yGridlines)
            ;

        gridy.call(yGridlines);
        // yGridlines(gridy);

        var xGridlines = d3.axisBottom(x)
            .ticks(30)
            .tickFormat("")
            .tickSize(height)

        var gridx = dataGroup.append("g")
            .attr("class", "grid")
            .call(xGridlines)
            ;

        gridx.call(xGridlines);
    }

    function circlePoints(propertyNames, dataGroup) {
        data.forEach(function (point) {
            for (var i = 0; i < propertyNames.length; i++) {
                dataGroup
                    .append("circle")
                    .attr("fill", d3.schemeCategory10[i])
                    .attr("r", 7)
                    .attr("cx", x(point.date))
                    .attr("cy", y(point[propertyNames[i]]))
                    .append("title")
                    .text("Date: " + d3.timeFormat("%Y-%m-%d")(point.date) + "\n" + propertyNames[i] + ": " + point[propertyNames[i]]);
            }
        });
    }

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
    function drawLegend(propertyNames, dataGroup) {
        var legendElements = [];

        var legend = dataGroup
            .append("g")

        var elementHeight = 50;

        var xOrigin = 800;
        var yOrigin = 500 - elementHeight * propertyNames.length;
        var width = 200;

        var xMargin = 5;
        var yMargin = 20;
        

        var height = propertyNames.length * elementHeight + 2 * yMargin;

        var elementWidth = 100;

        legend
            .append("rect")
            .attr("x", xOrigin)
            .attr("y", yOrigin)
            .attr("fill", "white")
            .attr("width", width)
            .attr("height", height)
            .attr("stroke", "gray");

        for (var i = 0; i < propertyNames.length; i++) {
            var element =
                {
                    color: d3.schemeCategory10[i],
                    title: propertyNames[i]
                }

            legendElements.push(element);

            console.dir(element);
        }

        var currentY = yOrigin + yMargin;

        legendElements.forEach(function (x) {
            legend.append("rect")
                .attr("fill", x.color)
                .attr("x", xOrigin + xMargin)
                .attr("y", currentY)
                .attr("width", elementWidth)
                .attr("height", elementHeight)
                .append("title")
                .text(x.title);

            var title = x.title.length < 8 ? x.title : x.title.substring(0, 8) + "...";

            legend.append("text")
                .text(title)
                .attr("font-size", "14pt")
                .attr("fill", x.color)
                .attr("x", xOrigin + xMargin)
                .attr("y", currentY)
                .attr("dx", elementWidth + xMargin)
                .attr("dy", yMargin);

            currentY += elementHeight;
        });
    }
  }
export default VizFancy





