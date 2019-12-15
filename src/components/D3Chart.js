import * as d3 from 'd3';

export class D3Chart {
  constructor(element) {
    this.initAccessors();
    this.initScales();
    this.initGenerators();
    this.initGroups(element);
  }

  initAccessors() {
    this.yAccessorClicks = d => d.Clicks;
    this.yAccessorImpressions = d => d.Impressions;
    this.xAccessor = d => d.Date;
  }

  initScales() {
    this.yScaleClicks = d3.scaleLinear();
    this.yScaleImpressions = d3.scaleLinear();
    this.xScale = d3.scaleTime();
  }

  initGenerators() {
    const lineGeneratorClicks = d3
      .line()
      .defined(d => !isNaN(this.yAccessorClicks(d)))
      .x(d => this.xScale(this.xAccessor(d)))
      .y(d => this.yScaleClicks(this.yAccessorClicks(d)));

    const lineGeneratorImpressions = d3
      .line()
      .defined(d => !isNaN(this.yAccessorImpressions(d)))
      .x(d => this.xScale(this.xAccessor(d)))
      .y(d => this.yScaleImpressions(this.yAccessorImpressions(d)));

    this.pathData = [
      {
        title: 'Clicks',
        lineGenerator: lineGeneratorClicks,
        color: '#af9358'
      },
      {
        title: 'Impressions',
        lineGenerator: lineGeneratorImpressions,
        color: '#4C63B6'
      }
    ];

    this.yAxisGeneratorClicks = d3.axisLeft().scale(this.yScaleClicks);
    this.yAxisGeneratorImpressions = d3
      .axisRight()
      .scale(this.yScaleImpressions);
    this.xAxisGenerator = d3.axisBottom().scale(this.xScale);
  }

  initGroups(element) {
    this.svg = d3.select(element).append('svg');
    this.bounds = this.svg.append('g');
    this.yAxisGroupClicks = this.bounds.append('g');
    this.yAxisGroupImpressions = this.bounds.append('g');
    this.xAxisGroup = this.bounds.append('g');
    this.chartGroup = this.bounds.append('g');
    this.legendGroup = this.bounds.append('g');
  }

  update(dimensions, data = []) {
    this.updateBounds(dimensions);
    this.updateScales(dimensions, data);
    this.updateAxis(dimensions);
    this.updateLegends(dimensions);
    this.updatePaths(dimensions, data);
  }

  updateBounds(dimensions) {
    this.svg
      .attr('width', dimensions.width)
      .attr('height', Math.max(0, dimensions.height - 10))
      .style('position', 'absolute');

    this.bounds.style(
      'transform',
      `translate(${dimensions.marginLeft}px, ${dimensions.marginTop}px)`
    );
  }

  updateScales(dimensions, data) {
    this.yScaleClicks
      .domain(d3.extent(data, this.yAccessorClicks))
      .range([dimensions.boundedHeight, 0])
      .nice();
    this.yScaleImpressions
      .domain(d3.extent(data, this.yAccessorImpressions))
      .range([dimensions.boundedHeight, 0])
      .nice();
    this.xScale
      .domain(d3.extent(data, this.xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice();
  }

  updateAxis(dimensions) {
    this.yAxisGroupClicks.transition(1000).call(this.yAxisGeneratorClicks);
    this.yAxisGroupImpressions
      .transition(1000)
      .call(this.yAxisGeneratorImpressions)
      .style('transform', `translateX(${dimensions.boundedWidth}px)`);
    this.xAxisGroup
      .transition(1000)
      .call(this.xAxisGenerator)
      .style('transform', `translateY(${dimensions.boundedHeight}px)`);
  }

  updateLegends(dimensions) {
    const legends = this.legendGroup.selectAll('svg').data(this.pathData);

    legends.exit().remove();

    legends
      .attr('x', (d, i) => i * 150)
      .attr('y', dimensions.boundedHeight + 25);

    const svg = legends
      .enter()
      .append('svg')
      .attr('viewBox', '0 0 150 50')
      .attr('x', (d, i) => i * 150)
      .attr('y', dimensions.boundedHeight + 25)
      .attr('width', 150)
      .attr('height', 60);
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 5)
      .attr('width', 30)
      .attr('height', 5)
      .attr('fill', d => d.color);
    svg
      .append('text')
      .attr('x', 40)
      .attr('y', 12)
      .attr('fill', '#777')
      .style('font-size', '1.8rem')
      .text(d => d.title);
  }

  updatePaths(dimensions, data) {
    const path = this.chartGroup.selectAll('path').data(this.pathData);
    //EXIT
    path.exit().remove();
    //UPDATE
    path.transition(1000).attr('d', d => d.lineGenerator(data));
    //ENTER
    path
      .enter()
      .append('path')
      .attr('d', d => d.lineGenerator(data))
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2);
  }
}
