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
    .directive('fsBar', [function() {
        'user strict';

        return {
            restrict: 'E',

            // set up the isolate scope so that we don't clobber parent scope
            scope: {
                onClick:  '=',
                width:    '=',
                height:   '=',
                bind:     '=',
                duration: '@'
            },
			link: function(scope, element, attrs) {

                var margin = {
                    top: 10, 
                    right: 10, 
                    bottom: 10, 
                    left: 10
                };

                var width = scope.width || 300;
                var height = scope.height || 1020;
                
                // add margin
                width = width - margin.left - margin.right;
                height = height - margin.top - margin.bottom;

                var klass = attrs.class || '';
                var align = attrs.align || 'left';

                var viewAlign = align === 'right' ? 'xMaxYMin' : 'xMinYMin';

                var x = d3.scale.linear()
                    .range([0, width]);

                var y = d3.scale.ordinal()
                    .rangeBands([0, height], .1);

                var svg = d3.select(element[0])
                    .append('svg')
                        .attr('preserveAspectRatio', viewAlign + ' meet')
                        .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                        .append('g')
                            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


                scope.$watch('bind', function(data) {

                    // pull info from scope
                    var duration = scope.duration || 0;
                    var delay = scope.delay || 0;
                    var field = scope.field || attrs.bind.split('.').pop().toLowerCase();

                    if (data) {

                        // pull the data array from the facet 
                        data = data.terms || [];

                        x.domain([0, d3.max(data, function(d) { return d.count; })*2]);
                        y.domain(data.map(function(d) { return d.term; }));

                        // random key here?
                        var bars = svg.selectAll('rect')
                            .data(data, function(d) { return Math.random(); });

                        // d3 enter fn binds each new value to a rect
                        bars.enter()
                            .append('rect')
                                .attr('class', 'bar rect ' + klass)
                                .attr('cursor', 'pointer')
                                .attr('y', function(d) { return y(d.term); })
                                .attr('height', y.rangeBand())
                                .attr('x', function(d) { 
                                    if (align === 'right') {
                                        return width;
                                    } else {
                                        return 0; 
                                    }
                                }) // added
                                .transition()
                                    .duration(duration)
                                        .attr('width', function(d) { return x(d.count); })
                                        .attr('x', function(d) { 
                                            if (align === 'right') {
                                                return width - x(d.count);
                                            } else {
                                                return 0;
                                            }
                                        });

                        // wire up event listeners - (registers filter callback)
                        bars.on('mousedown', function(d) {
                            scope.$apply(function() {
                                (scope.onClick || angular.noop)(field, d.term);
                            });
                        });

                        // d3 exit/remove flushes old values (removes old rects)
                        bars.exit().remove();

                        var labels = svg.selectAll("text")
                            .data(data, function(d) { return Math.random(); });

                        labels.enter()
                            .append('text')
                                .attr('class', 'bar text ' + klass)
                                .attr('cursor', 'pointer')
                                .attr('y', function(d) { return y(d.term) + y.rangeBand() / 2; })
                                .attr('x', function(d) { 
                                    if (align === 'right') {
                                        return width - x(d.count) - 3;
                                    } else {
                                        return x(d.count) + 3;
                                    }
                                })
                                .attr('dy', '.35em')
                                .attr('text-anchor', function(d) {
                                    if (align === 'right') {
                                        return 'end';
                                    } else {
                                        return 'start';
                                    }
                                })

                                .text(function(d) { 
                                    if (align === 'right') {
                                        return '(' + d.count + ') ' + d.term;
                                    } else {
                                        return d.term + ' (' + d.count + ')';
                                    }
                                });

                        // wire up event listeners - (registers filter callback)
                        labels.on('mousedown', function(d) {
                            scope.$apply(function() {
                                (scope.onClick || angular.noop)(field, d.term);
                            });
                        });

                        // d3 exit/remove flushes old values (removes old rects)
                        labels.exit().remove();
                    }
                })
            }
        };
    }]);
