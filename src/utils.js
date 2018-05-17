/**
 * initialization of constant object and functions
 *
 * @param {Object} obj Initial Data
 * @return {Object} Object of all the functions
 */
export const context = (obj) => {
    let initData = obj.data;
    let initDataLength = obj.data.length;
    const {
        chart,
        tip,
        bBox,
        xAxis,
        yAxis
    } = obj;
    const renderer = obj.d3;

    return ({
        /**
         * axes initialization
         * Initializing domains of x and y and mutating chart
         *
         * @param {Object} data base data to start with the visulation
         */
        axesInit: (data) => {
            initData = data;
            initDataLength = data.length;
            bBox.x.domain(data.map(d => d.date));
            bBox.y.domain([0, renderer.max(data, d => d.price)]);
            /* attaching the x axis */
            chart.append('g')
                            .attr('class', 'x axis')
                            .attr('transform', `translate(0, ${bBox.height})`)
                            .call(xAxis)
                            .selectAll('text')
                            .style('text-anchor', 'end')
                            .attr('dx', '-.8em')
                            .attr('dy', '.15em')
                            .attr('transform', 'rotate(-65)');
            /* attaching the y axis */
            chart.append('g')
                            .attr('class', 'y axis')
                            .call(yAxis)
                            .append('text')
                            .attr('y', -15)
                            .attr('dy', '.71em')
                            .style('text-anchor', 'end')
                            .text('Value');
        },
        /**
         * Initialization and updation of the bar
         * Mutating chart
         *
         * @param {Object} data base data to start with the visulation
         */
        barsFull: (data) => {
            let bar = chart.selectAll('.bar')
                            .data(data, function (d) { return d ? d.name : this.getAttribute('id'); });
            bar.exit().remove();
            bar.enter()
                            .append('rect')
                            .attr('class', 'bar')
                            .merge(bar)
                            .attr('x', d => bBox.x(d.date))
                            .attr('width', bBox.x.bandwidth())
                            .attr('y', d => bBox.y(d.price))
                            .attr('height', d => bBox.height - bBox.y(d.price))
                            .on('mouseover', tip.show)
                            .on('mouseout', tip.hide);
        },
        /**
         * Resetting domain of x and y
         * Mutating domains of x and y and chart
         *
         * @param {Object} data base data to start with the visulation
         */
        resetDomain: (data) => {
            bBox.y.domain([0, renderer.max(data, d => d.price)]);
            bBox.x.domain(data.map(d => d.date));
            chart.selectAll('.x') // change the x axis
                            .transition()
                            .duration(0.0001)
                            .call(xAxis)
                            .selectAll('text')
                            .style('text-anchor', 'end')
                            .attr('dx', '-.8em')
                            .attr('dy', '.15em')
                            .attr('transform', 'rotate(-65)');
            chart.selectAll('.y') // change the y axis
                            .transition()
                            .duration(0.0001)
                            .call(yAxis);
        },
        /**
         * Change the type of the csv price from string to number
         * Mutating data
         *
         * @param {string} d each price tuple from the loaded data
         * @return {number} typecasted price of each tupe from string to number
         */
        mutateType: (d) => {
            d.price = +d.price;
            return d;
        },
        /**
         * Sequence of actions when brush position is changed
         * Mutating domain andd chart
         *
         * @param {Array} s the data from the even of the selection of the width by the brush component
         * @param {Object} xBrush base axis object of the brush component
         */
        brushedFunc(s, xBrush) {
            let newData = this.getPoints(s[0], s[1], xBrush.range()[1]);
            this.resetDomain(newData);
            this.barsFull(newData);
        },
        /**
         * Sequence of actions when brush position is changed
         * Mutating domain andd chart
         *
         * @param {number} l leftmost measure of the brush component
         * @param {number} r rightmost measure of the brush component
         * @param {number} totalWidth width of the brush component
         * @return {Object} New data after clipping as per brush
         */
        getPoints: (l, r, totalWidth) => {
            let eachLen = totalWidth / initDataLength;
            let leftend = parseInt(l / eachLen, 10);
            let rightend = parseInt(r / eachLen, 10);
            let newData = initData.slice(leftend, rightend + 1);
            return newData;
        }
    });
};
