import * as d3 from 'd3';
import d3tip from 'd3-tip';
import { context } from './utils';
/* initialization of the margins and width for both brush and chart */
let margin = {
    top: 20,
    right: 20,
    bottom: 200,
    left: 40
};
let width = 940;
let height = 300;

/* keep a copy of the initial data to make mutations later on */

/* initialization of the type of visual for both brush and chart */
let x = d3.scaleBand().range([0, width]).padding(0.1);
let xBrush = d3.scaleBand().range([0, width]).padding(0.1);
let y = d3.scaleLinear().range([height, 0]);

/* initialization of axis for both brush and chart */
let xAxis = d3.axisBottom(x);
let xAxisBrush = d3.axisBottom(xBrush);
let yAxis = d3.axisLeft(y);

/* basic model set up of the chart */
let chart = d3.select('body').selectAll('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

/* initialization of the tip for the chart */
let tip = d3tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(d => `<strong> ${d.date} :</strong> <span style='color:red'> ${d.price} </span>`);

/* attaching the tip to the bar graph */
chart.call(tip);
let bBox = {
    height,
    width,
    x,
    y,
    margin
};
let paramObj = {
    data: [],
    chart,
    d3,
    tip,
    bBox,
    xAxis,
    yAxis
};
let utils = context(paramObj);

/**
 * calling the actions needed to execute when brush changes
 */
function brushed() {
    utils.brushedFunc(d3.event.selection, xBrush);
}
/*  initializing the brush */
let brush = d3.brushX()
                .extent([[0, 0], [width, 60]])
                .on('brush end', brushed);

/* loading csv data, initialization of the chart with the full data, initialization of the brush */
d3.csv('static.csv', utils.mutateType, (error, data) => {
    xBrush.domain(data.map(d => d.date)).range([0, width]);
    /* initialization of the chart with the full data */
    utils.axesInit(data);
    utils.barsFull(data);
    /* initialization of the brush */
    let brushElement = chart.append('g')
                    .attr('class', 'axis axis--x')
                    .attr('transform', `translate(0, ${height + 60})`)
                    .call(xAxisBrush)
                    .call(brush)
                    .call(brush.move, xBrush.range());
    /* tilting the text of the ticks of the brush */
    brushElement.selectAll('text')
                    .style('text-anchor', 'end')
                    .attr('dx', '-.8em')
                    .attr('dy', '.15em')
                    .attr('transform', 'rotate(-65)');
});
