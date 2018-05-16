import * as d3 from "d3";
import d3tip from 'd3-tip';
import {callChartInit,barsFull,axesInit,resetTicks,mutateType,brushedFunc,getPoints} from "./utils";
/**
 * initialization of the margins and width for both brush and chart
 */
let margin = { top: 20, right: 20, bottom: 200, left: 40 },
    width = 940,
    height = 300,
    height2 = 500;

/**
 * keep a copy of the initial data to make mutations later on
 */
let fulldata = {};
let fulldatalength = 0;

/**
 * initialization of the type of visual for both brush and chart
 */
let x = d3.scaleBand().range([0, width]).padding(0.1),
    x2 = d3.scaleBand().range([0, width]).padding(0.1),
    y = d3.scaleLinear().range([height, 0]);

/**
 * initialization of axis for both brush and chart
 */
let xAxis = d3.axisBottom(x),
    xAxis2 = d3.axisBottom(x2),
    yAxis = d3.axisLeft(y);

/**
 * initialization of the brush component
 */
let brush = d3.brushX()
    .extent([[0, 0], [width, 60]])
    .on("brush end", brushed);

/**
 * basic model set up of the chart
 */
let chart = d3.select("body").selectAll('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

/**
 * initialization of the tip for the chart
 */
let tip = d3tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>" + d.date + ":</strong> <span style='color:red'>" + d.price + "</span>";
    });
/**
 * attaching the tip to the bar graph
 */
chart.call(tip);
/**
 * loading csv data,initialization of the chart with the full data, initialization of the brush
 */
d3.csv('static.csv', mutateType, function (error,data) {
    x2.domain(data.map(function (d) { return d.date; })).range([0, width]);
    fulldata = data;
    fulldatalength = data.length;
    // initialization of the chart with the full data
    axesInit(data,width,height,x,y,d3,chart,xAxis,yAxis,margin);
    console.log(tip);
    barsFull(data,height,x,y,chart,tip);
    // initialization of the brush
    let small = chart.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + (height + 60) + ")")
        .call(xAxis2)
        .call(brush)
        .call(brush.move, x2.range());
    // tilting the text of the ticks of the brush
    small.selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
});
function brushed(){
    brushedFunc(brush,d3.event.selection,x2,d3,xAxis,yAxis,margin,height,chart,width,x,y,fulldatalength,fulldata,tip);
}
