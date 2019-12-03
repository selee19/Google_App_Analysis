var widthHBar = 400,
    heightHBar = 300,
    margin=180;
   

var svgHBar = d3.select("#h-bar").append("svg")
.attr("width", widthHBar+margin)
.attr("height", heightHBar)
    .append("g")
    .attr("transform", "translate(" + margin+ "," + 10+ ")");

var linearRatingScale = d3.scale.linear()
                         .domain([1,5])
                           .range([0,widthHBar-margin]);


var linearInstallScale = d3.scale.linear()
                         .domain([100000,25000000])
                           .range([0,widthHBar-margin]);

var linearReviewScale = d3.scale.linear()
                         .domain([0,50])
                           .range([0,widthHBar-margin]);
var linearSizewScale = d3.scale.linear()
                         .domain([0,100])
                           .range([0,widthHBar-margin]);

 var linearPaidwScale = d3.scale.linear()
                           
                             .range([0,widthHBar-margin]);                           
                           
    function drawHBar(data){
       
      svgHBar.selectAll("text").remove()
      svgHBar.selectAll("rect").remove()
       

       
        addRect(0,0,linearRatingScale(data["total_rating"]/data["count"]),20,"Avg Rating",(data["total_rating"]/data["count"]).toFixed(1)+"/5")
        addRect(0,40,linearInstallScale(data["total_install"]/data["count"]),20,"Avg Install",(data["total_install"]/(data["count"]*1000000)).toFixed(1)+"M / 25M")
        addRect(0,80,linearReviewScale(data["total_review"]/data["count"]),20,"Avg Review",(data["total_review"]/data["count"]).toFixed(1)+"/50")
        addRect(0,120,linearSizewScale(data["total_size"]/data["count"]),20,"Avg Size",(data["total_size"]/data["count"]).toFixed(1)+"MB/100MB")
        linearPaidwScale.domain([0,data["count"]]);
        addRect(0,160,linearPaidwScale(data["paid"]),20,"Paid App",(data["paid"]).toFixed(1)+"/"+data["count"])
        
        
        

    }
    function addRect(x,y,w,h,text,maxText){
        
        svgHBar.append('text')
        .attr("x", -margin/2) // X position is width of line graph + some epadding.
        .attr("y", y+15)
        .style("fill","white")
        .text(text)

        
        svgHBar.append('rect')
        .attr("x", x) // X position is width of line graph + some epadding.
        .attr("y", y-2) // Y position is based on index of rect.
       //Fixed width and height
        .attr("height",24)
        .attr("width", 0) 
        .style("opacity","0.9")
        //.style("cursor","pointer")
        .style("fill", function(d,i) { 
          return "white";
        })
        .transition()
         .duration(1000)
         .attr("width", widthHBar-margin) 
         .style("fill", function(d,i) { 
            return "white";
          })

        svgHBar.append('rect')
        .attr("x", x) // X position is width of line graph + some epadding.
        .attr("y", y) // Y position is based on index of rect.
        .attr("width", 0) //Fixed width and height
        .attr("height", h)
        .style("fill", function(d,i) { 
            return "#f39c12";
          })
        .transition()
         .duration(1000)
         .attr("width", w) 
        //.style("cursor","pointer")
        .style("fill", function(d,i) { 
          return "#f39c12";
        })
        svgHBar.append('text')
        .attr("x", widthHBar-margin+5) // X position is width of line graph + some epadding.
        .attr("y", y+15)
        .style("fill","white")
        .text(maxText)
    }
