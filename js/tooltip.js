import debounce from './debounce.js';

export default function tooltip() {
    // create a tooltip element for data display 
    const tooltip = d3.select('div.graph-container')
        .append('div')
        .attr('id', 'tooltip');

    const graphElement = document.querySelector('div.graph-container');
    let graphRect;
    const getGraphRect = () => {
        graphRect = graphElement.getBoundingClientRect();
    }

    window.addEventListener('resize', debounce(getGraphRect, 100));
    window.addEventListener('scroll', debounce(getGraphRect, 100));

    function handleMouseover(e) {
        // compute cursor x and y pos relative to div.graph-container,
        // and move tooltip to the cursor's left/right-top/bottom accordingly
        const tooltipPOS = () => {
            const cursorX = e.clientX - graphRect.left;
            const cursorY = e.clientY - graphRect.top;
            const x = cursorX < graphRect.width / 2
                ? `${cursorX + graphElement.scrollLeft + 8}px`
                : `${cursorX + graphElement.scrollLeft - 100}px`;
            const y = cursorY < graphRect.height / 2
                ? `${cursorY}px`
                : `${cursorY - 60}px`;
            return [x, y];
        }
        tooltip
            .attr('data-date', this.getAttribute('data-date'))
            .html(`
                <p>${this.getAttribute('data-date')}</p>
                <p>${this.getAttribute('data-gdp')} bln.</p>
            `)
            .style('opacity', 0.9)
            .style('left', tooltipPOS()[0])
            .style('top', tooltipPOS()[1])
    }

    function handleMouseout() {
        tooltip
            .style('opacity', 0)
    }

    return {
        handleMouseover,
        handleMouseout,
        getGraphRect
    }
}