var margin = {top: 20, right: 20, bottom: 100, left: 60},
    width = 1000 ,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width- margin.left - margin.right], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
   

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div"); 
var colors = d3.scale.category20() 
function drawBar(data) {


    x.domain(data.map(function(d) { return d.key; }));
    y.domain([0, d3.max(data, function(d) { return d.count; })+5]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll(".tick text")
               .call(wrap, x.rangeBand()); 
  
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .style("fill","white")
    .style("font-size", "16px")
    .attr("dy", "-2.51em")
    .style("text-anchor", "end")
    .text("Total Apps");

 var bar = svg.selectAll(".bar")
    .data(data)
    
  .enter().append("rect")
    .attr("class", function(d,i){
      return "bar bar-"+d.key;
    })
    .attr("x", function(d) { return x(d['key'])+18; })
    .attr("y", height)
    .attr("width", Math.min(50,x.rangeBand()))
    .attr("height", 0)
    .style("cursor", "pointer")
    .attr("fill",function(d,i){
       return "steelblue"
     
    });

bar
 .transition()
    .duration(1500)
    
    .attr("y", function(d) { return y(d['count']); })
    .attr("height", function(d) { return height - y(d['count']-0.2); })  
    
bar
.on("click",function(d){
  
  selectCategory(d.key)

})
.on('mouseover', function(d){
      tooltip.attr("class", "data-tooltip");
  tooltip.style("left", d3.event.pageX + 10 + "px");
  tooltip.style("top", d3.event.pageY - 25 + "px");
  tooltip.style("display", "inline-block");
       
  tooltip.html("<div class='tooltip-title'> Category : "+d.key+"</div><div class='tooltip-count'> Total App : "+ Number(d.count).toFixed(0)+"<div>");   
  })
  .on("mouseout", function(d) {
      tooltip.style("display", "none");
  }); 
}          

//Text Wrap funtion on x-axis labels
function wrap(text, width) {
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split("_").reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
