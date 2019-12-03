


var fill = d3.scale.category20();

var margin = {top: 20, right: 10, bottom: 100, left: 100}
var widthCloud= 1000,
    heightCloud = 500;
    var xScale ;


 
var yCloud = d3.scale.ordinal().rangeRoundBands([heightCloud-margin.bottom-margin.top, 0], .1)
var xCloud = d3.scale.linear().range([0,widthCloud]);


var xAxisCloud = d3.svg.axis()
    .scale(xCloud)
    .orient("bottom")
   

var yAxisCloud = d3.svg.axis()
    .scale(yCloud)
    .orient("left")
    .ticks(10);

var svgCloud = d3.select("#word-bar").append("svg")
    .attr("width", widthCloud + margin.left + margin.right)
    .attr("height", heightCloud + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

 function drawWord(category){

    d3.select("#word").select("svg").remove();
    var topwords = wordData[category].sort(function(x, y){
        return y.frequency- x.frequency;
     })
     topwords = topwords.slice(0,150);
     var barData = topwords.slice(0,10);
    

    var word_entries = d3.entries(topwords);

xScale= d3.scale.linear()
    .domain([0, d3.max(word_entries, function(d) {
       return d.value.frequency;
     })
    ])
    .range([5,25]);

    d3.layout.cloud().size([widthCloud, heightCloud])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value.frequency); })
          .text(function(d) { return d.value.word; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Impact")
          .on("end", draw)
          .start();

     function draw(words) {

    
            d3.select("#word").append("svg")
                .attr("width", widthCloud)
                .attr("height", heightCloud)
              .append("g")
                .attr("transform", "translate(" + [widthCloud >> 1, heightCloud >> 1] + ")")
              .selectAll("text")
                .data(words)
              .enter().append("text")
                .style("font-size", function(d) { return xScale(d.value.frequency) + "px"; })
                .style("font-family", "Impact")
                .style("fill", function(d, i) { return fill(i); })
                .attr("text-anchor", "middle")
                .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.value.word; })
                .on('mouseover', function(d){
                    tooltip.attr("class", "data-tooltip");
                tooltip.style("left", d3.event.pageX + 10 + "px");
                tooltip.style("top", d3.event.pageY - 25 + "px");
                tooltip.style("display", "inline-block");
                     
                tooltip.html("<div class='tooltip-title'> Word : "+d.value.word+"</div><div class='tooltip-count'> Frequency : "+ Number(d.value.frequency).toFixed(0)+"<div>");   
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");
                }); ;
          }
        
          d3.layout.cloud().stop();

// Below frequency bar
          drawBar(barData);
          function drawBar(barData){

            yCloud.domain(barData.map(function(d) { 
             
                return d.word; 
            }));
            xCloud.domain([0, Number(d3.max(barData, function(d) { return d.frequency; }))+10]);
        
            svgCloud.selectAll(".axis").remove();
            
             svgCloud.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxisCloud)
            .selectAll(".tick text")
            .style("font-size","14px")
           
          
           svgCloud.append("g")
            .attr("class", "y axis")
            .call(yAxisCloud)
            .selectAll(".tick text")
            .style("font-size","14px")
          
         var bar = svgCloud.selectAll(".bar")
            .data(barData)
            
          .enter().append("rect")
            .attr("class", function(d,i){
              return "bar bar-"+d.word;
            })
            .attr("x", 0)
            .attr("y", function (d) {
                
                return yCloud(d.word);
            })
           
            .attr("height", 30)
            .style("cursor", "pointer")
            .attr("fill",function(d,i){
               return "steelblue"
             
            });
        
        bar
         .transition()
            .duration(1500)
            .attr("y", function (d) {
                return yCloud(d.word) ;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return 0 ;
            })
            .attr("width", function (d) {
                return xCloud(d.frequency);
            });
        bar.on('mouseover', function(d){
              tooltip.attr("class", "data-tooltip");
          tooltip.style("left", d3.event.pageX + 10 + "px");
          tooltip.style("top", d3.event.pageY - 25 + "px");
          tooltip.style("display", "inline-block");
               
          tooltip.html("<div class='tooltip-title'> Word : "+d.word+"</div><div class='tooltip-count'> Frequency: "+ Number(d.frequency).toFixed(0)+"<div>");   
          })
          .on("mouseout", function(d) {
              tooltip.style("display", "none");
          }); 
         }
 }    
