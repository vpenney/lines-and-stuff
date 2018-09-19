import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 300 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Normal scales
const xPositionScale = d3
  .scaleLinear()
  .domain([1, 25])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([10, 50])
  .range([height, 0])

// define the x position of the line 
// the same way you would for circles
const line = d3
.line()
.x(d => {
  return xPositionScale(d.day)
})
.y(d => {
  return yPositionScale(d.temperature)
})

d3.csv(require('./data-singleline-cimmeria.csv'))
  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  /* Add in your temperature circles */

  // a line goes from point a to point b
  // but a path goes through multiple points
  svg
    .append('path')
    // use datum because you have one thing,
    // not many
    .datum(datapoints)
    .attr('stroke', 'salmon')
    .attr('stroke-width', 2)
    .attr('d', line)
    .attr('fill', 'none')


  svg
    // find everything with the class "cimmeria temp"
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('fill', 'salmon')
    .attr('r', 3)
    .attr('cx', d => {
      return xPositionScale(d.day)
    })
    .attr('cy', d => {
      return yPositionScale(d.temperature)
    })

  /* Add in your axes */

  const xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
}

export{xPositionScale, yPositionScale, line}