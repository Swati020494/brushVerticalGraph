/**
* axes initialization
*/
export let axesInit = (data,width,height,x,y,d3,chart,xAxis,yAxis,margin) => {
    x.domain(data.map(function (d) { return d.date; }));
    y.domain([0, d3.max(data, function (d) { return d.price; })]);
    /**
    * attaching the x axis
    */
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    /**
    * attaching the y axis
    */
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("y", -15)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
};
/**
* initialization and updation of the bar
*/
export let barsFull = (data,height,x,y,chart,tip) => {
    let bar = chart.selectAll(".bar")
        .data(data, function (d) { return d ? d.name : this.getAttribute("id"); });
    bar.exit().remove();
    bar.enter()
        .append("rect")
        .attr("class", "bar")
        .merge(bar)
        .attr("x", function (d) { return x(d.date); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.price); })
        .attr("height", function (d) { return height - y(d.price); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

};
/**
* domain reset
*/
export let resetDomain = (data,d3,x,y,width,margin,chart,xAxis,yAxis) => {
    y.domain([0, d3.max(data, function (d) { return d.price; })]);
    x.domain(data.map(function (d) { return d.date; }));
    chart.selectAll(".x") // change the x axis
        .transition()
        .duration(0.0001)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    chart.selectAll(".y") // change the y axis
        .transition()
        .duration(0.0001)
        .call(yAxis);
};

/**
* mutate the type of the csv price from string to integer
*/
export let mutateType = (d) => {
    d.price = +d.price;
    return d;
};
/**
* call when brush is called
*/
export let brushedFunc = (brush,s,x2,d3,xAxis,yAxis,margin,height,chart,width,x,y,fulldatalength,fulldata,tip) => {
    let newData = getPoints(s[0], s[1], x2.range()[1],fulldatalength,fulldata);
    resetDomain(newData,d3,x,y,width,margin,chart,xAxis,yAxis);
    barsFull(newData,height,x,y,chart,tip);
};
/**
* call when brush is called
*/
export let  getPoints = (l, r, totalWidth,fulldatalength,fulldata) => {
    let eachLen = totalWidth / fulldatalength;
    let leftend = parseInt(l / eachLen, 10);
    let rightend = parseInt(r / eachLen, 10);
    let newData = fulldata.slice(leftend, rightend + 1);
    return newData;
};