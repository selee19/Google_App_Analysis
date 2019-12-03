var totalApps,totalCategory,totalReviews=0,totalInstall=0;
var categorySet = new Set();
var categoryData ={},top10Category,wordData={};
d3.csv("apps_info.csv", function(error, data) {
    
    if (error) {
        throw error;
    }

    processData(data)

    d3.csv("word.csv", function(error, data) {

        data.forEach(element => {
        if(!wordData[element.category]){
            wordData[element.category] = [];
        }
        wordData[element.category].push({"word":element.word,"frequency":element.freq})
        });
        });
        
        setTimeout(function(){
            drawWord("ART_AND_DESIGN");
            showDiv("category");
            loadCateogry();
        },0)
    });

    function processData(data){
        totalApps= data.length;
        setNumber("#total-app",totalApps)
      data.forEach(element => {
         
      
          categorySet.add(element["Category"])
          if(!categoryData[element["Category"]]) {

            categoryData[element["Category"]]={};
            categoryData[element["Category"]]["count"]=0;
            categoryData[element["Category"]]["data"] = [];
            categoryData[element["Category"]]["Genres"]={};
            categoryData[element["Category"]]["total_rating"]=0;
            categoryData[element["Category"]]["total_review"]=0;
            categoryData[element["Category"]]["total_size"]=0;
            categoryData[element["Category"]]["total_install"]=0;
            categoryData[element["Category"]]["paid"]=0;
             
        }
          if(categoryData[element["Category"]]["Genres"][element["Genres"]]){
            categoryData[element["Category"]]["Genres"][element["Genres"]]+=1;
          } else 
          {
            categoryData[element["Category"]]["Genres"][element["Genres"]] =1;
           
          }
          if(element.Type=='Paid'){
            categoryData[element["Category"]]["paid"]+=1;
          }
          totalInstall+=Number(element["Installs"].substring(0,element["Installs"].length-1).replace(/,/g, ''));
          totalReviews+=Number(element["Translated_Review"].split(",").length)
          
          categoryData[element["Category"]]["count"]+=1;
          
          categoryData[element["Category"]]["total_rating"]=
          (categoryData[element["Category"]]["total_rating"]+Number(element["Rating"]));
         
          var size = Number(element["Size"].substring(0,element["Size"].length-1))
         
          if(size){
             
              categoryData[element["Category"]]["total_size"]=
          (categoryData[element["Category"]]["total_size"]+size);
          
          }
          categoryData[element["Category"]]["total_review"]=
          (categoryData[element["Category"]]["total_review"]+Number(element["Translated_Review"].split(",").length));
          categoryData[element["Category"]]["total_install"]=
          (categoryData[element["Category"]]["total_install"]+Number(element["Installs"].substring(0,element["Installs"].length-1).replace(/,/g, '')));
          
          categoryData[element["Category"]]["data"].push(element);
          
      });
      
      totalCategory = categorySet.size;
     
      
      setNumber("#total-category",totalCategory)
      setNumber("#total-review",formatCash(totalReviews))
      setNumber("#total-install",formatCash(totalInstall))
      var categoryDataArray=[];
      for (var key in categoryData){
        categoryDataArray.push({'key':key,'count':categoryData[key]["count"],'data':categoryData[key]["data"]})
      }
      

       top10Category = categoryDataArray.sort(function(a, b) { return a.count < b.count ? 1 : -1; })
                .slice(0, 10);

              
      drawBar(top10Category);
      selectCategory("GAME",true)

    
    }    
    function selectCategory(categoryName,stopAnimation){

        if(!stopAnimation){
        $('html, body').animate({
            scrollTop: $("#focus").offset().top
        }, 1000);
    }

        d3.selectAll(".bar").style("fill","steelblue")
        d3.select(".bar-"+categoryName).style("fill","rgb(243, 156, 18)")

        $("#categoryName").text(categoryName)
        drawPie(categoryData[categoryName])
        drawHBar(categoryData[categoryName])
    }
    function setNumber(id,value){
        $(id).html(value)
    }
    const formatCash = n => {
        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
        if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
        if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
        if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
      };
      function showDiv(div){

        $("#category").hide();
        $("#tag").hide();
        $("#"+div).show();
      }

      function loadCateogry(){
        $('#category-selection').empty();

        $.each(wordData, function(i, p) {
            
            $('#category-selection').append($('<option></option>').val(i).html(i));
        });
      }