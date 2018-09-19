import * as d3 from 'd3'

const margin = { top: 30, left: 30, right: 30, bottom: 30 }
const height = 300 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-2')
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

const line = d3
  .line()
  .x(d => {
    return xPositionScale(d.day)
  })
  .y(d => {
    return yPositionScale(d.temperature)
  })

/*
  We want to read in:
  
    d3.csv(require('./data-singleline-cimbria.csv'))
  
  But we also want to read in:
  
    d3.csv(require('./data-singleline-cimmeria.csv'))
  
  How do we do both?
*/
// const files = [
// './data-singleline-cimbria.csv',
// './data-singleline-cimmeria.csv'
// ]

// const promises = filenames.map(filename => {
//   return d3.csv(require(filename))
// })

// Promise.all(promises)

Promise.all([
  d3.csv(require('./data-singleline-cimbria.csv')),
  d3.csv(require('./data-singleline-cimmeria.csv'))
])

  .then(ready)
  .catch(err => {
    console.log('Failed with', err)
  })

// assign the first item of this list to datapointsCimbria
// and the second item of this list to datapointsCimmeria
// we can only use this because Parcel uses Babbel
function ready([datapointsCimbria, datapointsCimmeria]) {
  console.log(datapointsCimbria)
  /* Add in your temperature circles */
  svg
    .selectAll('.cimbria-dot')
    .data(datapointsCimbria)
    .enter()
    .append('circle')
    .attr('class', 'cimbria-dot')
    .attr('r', 3)
    .attr('cx', d => {
      return xPositionScale(d.day)
    })
    .attr('cy', d => {
      return yPositionScale(d.temperature)
    })

  svg
    .selectAll('.cimmeria-dot')
    .data(datapointsCimmeria)
    .enter()
    .append('circle')
    .attr('class', 'cimmeria-dot')
    .attr('r', 3)
    .attr('cx', d => {
      return xPositionScale(d.day)
    })
    .attr('cy', d => {
      return yPositionScale(d.temperature)
    })
  // append a new path to the svg
  // and give it whatever attributes it wants
  // (stroke, stroke-width, d, fill)

  // .lower() pushes it below everything else
  svg
    .append('path')
    .datum(datapointsCimbria)
    .attr('stroke-width', 2)
    .attr('stroke', 'lightblue')
    .attr('fill', 'none')
    .attr('d', line)
    .lower()

  svg
    .append('path')
    .datum(datapointsCimmeria)
    .attr('stroke-width', 2)
    .attr('stroke', 'pink')
    .attr('fill', 'none')
    .attr('d', line)
    .lower()

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
