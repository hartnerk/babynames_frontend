import React from 'react'
import { useD3 } from '../hooks/useD3'
import * as d3 from 'd3'

import { Chart } from '../styles/styledComponents/Chart'





function PopChart({name_data}) {



const ref = useD3(
    (svg) => {
        const margin = {top: 20, bottom: 10}
        const CHART_WIDTH = 400
        const CHART_HEIGHT = 200 - margin.top - margin.bottom

        const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1)
        const y = d3.scaleLinear().range([CHART_HEIGHT, 0])

        const chartContainer = d3.select('svg')
            .attr('width', CHART_WIDTH)
            .attr('height', CHART_HEIGHT + margin.top + margin.bottom)

            x.domain(name_data.map(d => d.decade))
            y.domain([0, 1000])

        const chart = chartContainer.append('g')

        chart.append('g')
            .call(d3.axisBottom(x).tickSizeOuter(0))
            .attr('transform', `translate(0, ${CHART_HEIGHT})`)
            .attr('color', '#4f009e')

        chart
            .selectAll('.bar')
            .data(name_data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('width', x.bandwidth())
            .attr('height', data => CHART_HEIGHT - y(data.rank))
            .attr('x', data => x(data.decade))
            .attr('y', data => y(data.rank))
    },
    [name_data.length]
)


    return (
        <Chart>
        <svg ref={ref}>
            
        </svg>
        </Chart>
    )
}

export default PopChart
