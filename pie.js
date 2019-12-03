var widthPie = 400,
    heightPie = 300,
    radius = Math.min(widthPie, heightPie) / 2;

    
var color = d3.scale.ordinal()
    .range(["#2ecc71", "#3498db", "#e67e22", "#16a085", "#8e44ad", "#e74c3c", "#1abc9c","#2c3e50","#d35400"]);

    color= d3.scale.category20();
var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.value; });

var svgPie = d3.select("#pie").append("svg")
.attr("width", widthPie)
.attr("height", heightPie)
    .append("g")
    
    .attr("transform", "translate(" + widthPie / 2 + "," + heightPie / 2 + ")");

    var legend = d3.select("#legends").append("svg")
    .attr("width", widthPie)
    .attr("height", 600)
             .attr("class", "legend")
            .attr('transform', 'translate('+0+','+0+')')  
    function drawPie(data){

        svgPie.selectAll(".arc").remove()
        legend.selectAll("rect").remove()
        legend.selectAll("text").remove()

        var pieData = [];
        var total=0;
        for (var key in data.Genres) {

            pieData.push({
              name: key,
              value: data.Genres[key]
             
            })
            total+=data.Genres[key];
          };
         // color.domain(pieData.map(d=>d.name))
        


  var g = svgPie.selectAll(".arc")
      .data(pie(pieData))
      .enter().append("g")
      .attr("class", "arc");

  
g.append("path")
         .attr("fill", function(d, i) { return color(i); })
       .transition()
         .ease("bounce")
         .duration(2000)
         .attrTween("d", tweenPie)
       .transition()
         .ease("elastic")
         .delay(function(d, i) { return 2000 + i * 50; })
         .duration(750)
         .attrTween("d", tweenDonut)
         
         g.on('mouseover', function(d){
            tooltip.attr("class", "data-tooltip");
        tooltip.style("left", d3.event.pageX + 10 + "px");
        tooltip.style("top", d3.event.pageY - 25 + "px");
        tooltip.style("display", "inline-block");
             
        tooltip.html("<div class='tooltip-title'> Genres : "+d.data.name+"</div><div class='tooltip-count'> Total App : "+ Number(d.value).toFixed(0)+"<div>");   
        })
        .on("mouseout", function(d) {
            tooltip.style("display", "none");
        }); 
     
     
     function tweenPie(b) {
       b.innerRadius = 0;
       var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
       return function(t) { return arc(i(t)); };
     }
     
     function tweenDonut(b) {
       b.innerRadius = radius * .6;
       var i = d3.interpolate({innerRadius: 0}, b);
       return function(t) { return arc(i(t)); };
     }
     
         
  
         
       
       legend.selectAll('rect')
         .data(pieData) // Traverse thorugh data
         .enter()
         .append("rect") 
         .attr("width", 25) //Fixed width and height
         .attr("height", 20)
         //.style("cursor","pointer")
         .style("fill", function(d,i) { 
          
           return color(i);
         })
         .attr("x", 0) // X position is width of line graph + some epadding.
        // .attr("y", function(d, i){ return (i-1) *  30;}) // Y position is based on index of rect.
         .transition()
         .delay(function(d,i){return 200*i;})
         .attr("x", 0) // X position is width of line graph + some epadding.
         .attr("y", function(d, i){ return i *  30;}) // Y position is based on index of rect.
         .attr("width", 25) //Fixed width and height
         .attr("height", 20)
         //.style("cursor","pointer")
         .style("fill", function(d,i) { 
          
           return color(i);
         })
         
       legend.selectAll('text')
         .data(pieData)
         .enter()
         .append("text")
         .attr("x", 0)
         .style("font-size","0px")
         .transition()
         .delay(function(d,i){return 200*i;})
         .style("font-size","14px")
         //.style("cursor","pointer")
         .attr("x", 30)
         .attr("y", function(d, i){ return i *  30 +12;})
         .style("fill","#fff")
         .text(function(d) {
            return d.name + " ( "+((d.value/total)*100).toFixed(1 )+" % )";
         })
             

    }
