/*! dangle - v1.0.0 - 2013-03-02
* http://www.fullscale.co/dangle
* Copyright (c) 2013 FullScale Labs, LLC; Licensed MIT */

/* 
 * Copyright (c) 2012 FullScale Labs, LLC
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

angular.module('dangle')
    .directive('fsColumn', [function() {
        'use strict';

        return {
			restrict: 'E',

            // set up the isolate scope so that we don't clobber parent scope
            scope: {
                fontSize: '=',
                onClick: '=',
                width: '=',
                height: '=',
                bind: '='
            },
			link: function(scope, element, attrs) {

                var margin = {top:20, right: 20, bottom: 30, left: 40};
                var width = scope.width || 960;
                var height = scope.height || 500;
                var color = attrs.color || 'steelblue';
                var fontColor = attrs.fontColor || '#000';
                var fontSize = scope.fontSize || 14;
                var label = attrs.label || 'Frequency';

                // if no field param is set, use the facet name but normalize the case
                if (attrs.field == undefined) {
                    attrs.field = attrs.bind.split('.').pop().toLowerCase();
                }

                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient('bottom');

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient('left');

                var svg = d3.select(element[0])
                    .append('svg')
                        .attr('preserveAspectRatio', 'xMinYMin meet')
                        .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                        .append('g')
                            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


                scope.$watch('bind', function(data) {

                    if (data) {
                        data = data.terms || [];
                        svg.selectAll('*').remove();

                        x.domain(data.map(function(d) { return d.term; }));
                        y.domain([0, d3.max(data, function(d) { return d.count; })]);

                        svg.append('g')
                            .attr('fill', fontColor)
                            .attr('font-size', fontSize)
                            .attr('class', 'x axis')
                            .attr('transform', 'translate(0,' + height + ')')
                            .call(xAxis);

                        svg.append('g')
                            .attr('class', 'y axis')
                            .attr('font-size', fontSize)
                            .attr('fill', fontColor)
                            .call(yAxis)
                            .append('text')
                                .attr('transform', 'rotate(-90)')
                                .attr('y', 6)
                                .attr('dy', '.51em')
                                .style('text-anchor', 'end')
                                .text(label);

                        svg.selectAll('.bar')
                            .data(data)
                            .enter()
                                .append('rect')
                                    .attr('fill', color)
                                    .attr('x', function(d) { return x(d.term); })
                                    .attr('width', x.rangeBand())
                                    .attr('y', function(d) { return y(d.count); })
                                    .attr('height', function(d) { return height - y(d.count); })
                                    .on('mousedown', function(d) {
                                        scope.$apply(function() {
                                        (scope.onClick || angular.noop)(attrs.field, d.term);
                                    });
                                });
                    }
                })
            }
        };
    }]);
