
$( function () {
     // generate bars
     function barsGen(data, height, width, padding, id, scale) {
       let svg = d3.select(id);
       let h = height;
       let w= width;
       let pad = padding;
       svg.selectAll("rect").data(data).enter().append("rect")
       .attr("x", function(d, i) {
            return (i * (w / data.length))
       })
       .attr("y", function (d) {
            return (h - d[1] * scale);
       })
       .attr("width", function (d, i) {
            return (w / data.length - pad)
       })
       .attr("height", function (d) {
            return (d[1] * scale);
       })
       .attr("fill", function (d) {
          return ("rgb(0, 0," + Math.round(d[1] * scale) + ")");
       })

       
     }

     // generate in-bars labels
     function genLabelsIn(data, height, width, padding, id, extra, scale) {
       let svg = d3.select(id);
       let h = height;
       let w= width;
       let pad = padding;
       
       svg.selectAll(".in_bars").data(data).enter().append("text")
       .text( function (d) {
          if (extra !== null) return (Math.round(d[1]) + extra)
          return(Math.round(d[1]));
       })
       .attr("class", "in_bars")
       .attr("x", function(d, i) {
          return (i * (w / data.length) + scale + 5)
       })
       .attr("y", function (d) {
          if (d[1] === 0) return (h - d[1] * scale);
          return (h - d[1] * scale + 17);
       })
       .attr("fill", function (d) {
          if (d[1] === 0) return("black");
          return("white")
       });
     }

     // generate down bar labels
     function genLabelsDown(data, height, width, padding, id) {
          let svg = d3.select(id);
          let h = height;
          let w= width;
          let pad = padding;

          svg.selectAll(".down_bars").data(data).enter().append("text")
          .text( function (d) {
             return(d[0]);
          })
          .attr("class", "down_bars")
          .attr("x", function(d, i) {
             return (i * (w / data.length) + 12)
          })
          .attr("y", function (d) {
             return (h + 30);
          })
          .attr("fill", function (d) {
             return("rgb(242, 101, 14)")
          })
          .attr("transform", function(d, i) {
             let posX = i * (w / data.length) + 15;
             let posY = h + 35;
             return ("rotate(-70, " + posX + ", " + posY + ")");
          }); 
     }


     // generate tile for a bar
     function genTitle(x, y, id, title) {
          let svg = d3.select(id);
          let d = [title];
          svg.selectAll(".barTitle").data(d).enter().append("text")
          .text(function (d) {
               return (title);
          })
          .attr("class", "barTitle")
          .attr("x", x)
          .attr("y", y)
          .attr("style", "font: italic 20pt serif")
          .attr("fill", "blue")

     }

     // load and extract good roads data with percentages for rendering
     $.get("../js/Road-condition.json", function (data) {
          let good_roads = [];
          let roads_no_percent = [];
          let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UWR"]
          for (let j = 0; j < regions.length; j++) {
               let goodReg = [];
               let count = 0;
               let countrds = 0;   
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['Region'] === regions[j]){
                         countrds++;
                         if (data[i]["Cond."] === "Good") count++;
                    }
               }
               goodReg[0] = regions[j];
               goodReg[1] = (count / countrds) * 100;
               good_roads.push(goodReg);  
          }

          // extract good roads data without percentages for rendering
          for (let j = 0; j < regions.length; j++) {
               let goodReg = [];
               let count = 0;
               let countrds = 0;   
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['Cond.'] === "Good"){
                         countrds++;
                         if (data[i]["Region"] === regions[j]) count++;
                    }
               }
               goodReg[0] = regions[j];
               goodReg[1] = count;
               roads_no_percent.push(goodReg);  
          }

          barsGen(roads_no_percent, 300, 470, 2, "svg#no_cent", 2);
          genLabelsIn(roads_no_percent, 300, 470, 2, "svg#no_cent", null, 2);
          genLabelsDown(roads_no_percent, 300, 470, 2, "svg#no_cent");
          genTitle(130, 380, "svg#no_cent", "No. of good roads");
          barsGen(good_roads, 300, 470, 2, "svg#good_rds", 5);
          genLabelsIn(good_roads, 300, 470, 2, "svg#good_rds", "%", 5);
          genLabelsDown(good_roads, 300, 470, 2, "svg#good_rds");
          genTitle(130, 380,"svg#good_rds", "percentage no. of good roads");
     })
})