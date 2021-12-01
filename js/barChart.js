import getData from "./getData.js";
import tooltip from "./tooltip.js";

getData().then(({ gdpDates, gdpValues }) => {
    // graph constants
    const w = 500;
    const h = 350;
    const paddingX = 50;
    const paddingY = 25;
    // svg container element
    const svgChart = d3.select('.graph-container')
        .append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`)
        .attr('preserveAspectRatio', 'xMinYMin meet');
    // x and y scales
    const xScale = d3.scaleTime()
        .domain([new Date(gdpDates[0]), new Date(gdpDates[gdpDates.length - 1])])
        .range([paddingX, w - paddingX]);
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(gdpValues)])
        .range([h - paddingY, paddingY]);
    // x and y axis
    const xAxis = d3.axisBottom(xScale).ticks(9);
    const yAxis = d3.axisLeft(yScale);
    // tooltip
    const { handleMouseover, handleMouseout, getGraphRect } = tooltip();


    // draw the bar-chart
    svgChart.selectAll('rect')
        .data(gdpDates)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(new Date(d)))
        .attr('y', (d, i) => yScale(gdpValues[i]))
        .attr('width', (w - paddingX * 2) / gdpDates.length - 0.1)
        .attr('height', (d, i) => h - paddingY - yScale(gdpValues[i])) // subtract padding to set correct height
        .attr('data-date', d => d)
        .attr('data-gdp', (d, i) => gdpValues[i])
        .on('mouseover', handleMouseover)
        .on('mouseout', handleMouseout);

    // draw axes
    svgChart.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(0, ${h - paddingY})`)
        .call(xAxis);
    svgChart.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${paddingX}, 0)`)
        .call(yAxis);
    svgChart.append('text')
        .text('Gross Domestic Product (bln.)')
        .attr('font-size', '10')
        .attr('transform', 'rotate(-90)')
        .attr('x', '-160')
        .attr('y', '70');

    // get graph-area dims after drawing for tooltip position
    getGraphRect();
})