# dangle.js

A set of [AngularJS](http://angularjs.org/) directives that provide common [D3](http://d3js.org/) visualizations for [elasticsearch](http://www.elasticsearch.org/).

**NOTE: this is still pretty experimental work so consider the APIs volatile.**

## Project Goal

D3 comes from a very [prestigious lineage](http://en.wikipedia.org/wiki/Protovis#Context) and is arguably one of the most powerful open source visualizations libraries available. This power comes at a cost of having a relatively steep learning curve. The goal of dangle is to minimize this curve as much as possible.

At the cost of starting a potential religious war, let me briefly explain why we chose AngularJS over other alternatives such as [Backbone](http://backbonejs.org/) and [Ember](http://emberjs.com/).

We chose AngularJS because [directives](http://docs.angularjs.org/guide/directive) allow us to create an HTML based DSL around D3, making it extremely easy to insert (i.e., dangle) graphs from the DOM in a concise, declarative manner. D3's direct DOM manipulation fits well with Angular's DOM based templating. We believe that in order to provide the best experience, we have to be opinionated here.

If you'd like something more framework agnostic then you should have a look at [NVD3](http://nvd3.org/).

## Available Directives

- `<fs:bar />` Horizontal bar chart. Good for visualizing terms facets
- `<fs:column />` Vertical bar chart.
- `<fs:area />` A traditional area chart (fill can be set to none to produce a line graph)
- `<fs:pie />` A naive pie chart (you probably want to use donut)
- `<fs:donut />` A more sophisticated pie chart that includes labels and innner radius settings.
- `<fs:date-histo />` This is really a time-series being exploited to display an elasticsearch date-histogram. It has several caveats<sup>1,2</sup>

## 

1. elasticsearch allows you to define different time [intervals](http://www.elasticsearch.org/guide/reference/api/search/facets/date-histogram-facet.html) in your query but the interval is not returned as part of the response, making it difficult to auto-detect the proper interval. We've got a pull request in that resolves this.

2. the date histogram in elasticsearch is a true histogram meaning that empty bins are not created for missing intervals. This causes issues with the x-axis (time) because we're using D3 [time scales](https://github.com/mbostock/d3/wiki/Time-Scales) which automatically produce the best time labels for the given period. We're working on a possible patch to resolve this in elasticsearch.

## Documentation
You can find the official documentation [here](http://www.fullscale.co/dangle)

You will also be able to find unofficial documentation and examples on on our 
[blog](http://www.fullscale.co/blog/) and GitHub Gist pages [here](https://gist.github.com/mattweber)
and [here](https://gist.github.com/egaumer).

You can see a simple demo [here](http://www.fullscale.co/dangle/demo/).

**3rd Party Documentation**

- [AngularJS](http://angularjs.org/) - HTML enhanced for web apps.
- [elasticsearch](http://www.elasticsearch.org/) - the most advanced search engine to date.
- [D3](http://d3js.org/) - a JavaScript library for manipulating documents based on data.

## License
Copyright (c) 2012 FullScale Labs, LLC  
Licensed under the MIT license.