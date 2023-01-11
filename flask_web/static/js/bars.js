$( function () {

     // generate bars
     function barsGen(data, height, width, padding, id, scale) {
       const svg = d3.select(id);
       const h = height;
       const w= width;
       const pad = padding;
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
       const svg = d3.select(id);
       const h = height;
       const w= width;
       const pad = padding;
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
          const svg = d3.select(id);
          const h = height;
          const w= width;
          const pad = padding;

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
             const posX = i * (w / data.length) + 15;
             const posY = h + 35;
             return ("rotate(-70, " + posX + ", " + posY + ")");
          });
     }


     // generate tile for a bar
     function genTitle(x, y, id, title) {
          const svg = d3.select(id);
          const d = [title];
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
    $.get("/api/v1/allGoodRoads", function (data) {
	$.get("/api/v1/stats", function (dat) {
          let good_roads = [];
          let roads_no_percent = [];
          let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UWR"]
          for (let j = 0; j < regions.length; j++) {
               let goodReg = [];
               let count = 0;
               let countrds = 0;
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['region'] === regions[j]){
                         count++;
                    }
               }
              goodReg[0] = regions[j];
	      countrds = dat[regions[j]]
	      console.log(countrds);
              goodReg[1] = (count / countrds) * 100;
              good_roads.push(goodReg);
          }

          // extract good roads data without percentages for rendering
          for (let j = 0; j < regions.length; j++) {
               let goodReg = [];
               let count = 0;
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['region'] === regions[j]){
                         count++;
                    }
               }
               goodReg[0] = regions[j];
               goodReg[1] = count;
               roads_no_percent.push(goodReg);
          }
          barsGen(roads_no_percent, 300, 470, 2, "svg#good_no_cent", 1);
          genLabelsIn(roads_no_percent, 300, 470, 2, "svg#good_no_cent", null, 1);
          genLabelsDown(roads_no_percent, 300, 470, 2, "svg#good_no_cent");
          genTitle(130, 380, "svg#good_no_cent", "No. of good roads");
          barsGen(good_roads, 300, 470, 2, "svg#good_rds", 5);
          genLabelsIn(good_roads, 300, 470, 2, "svg#good_rds", "%", 5);
          genLabelsDown(good_roads, 300, 470, 2, "svg#good_rds");
            genTitle(130, 380,"svg#good_rds", "percentage no. of good roads");
	})
     })

     // load and extract poor roads data with percentages for rendering
    $.get("/api/v1/allPoorRoads", function (data) {
	$.get("/api/v1/stats", function (dat) {
          let poor_roads = [];
          let poor_roads_no_percent = [];
          let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UWR"];
          for (let j = 0; j < regions.length; j++) {
               let poorReg = [];
               let count = 0;
               let countrds = 0;
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['region'] === regions[j]){
                         count++;
                    }
               }
               poorReg[0] = regions[j];
	       countrds = dat[regions[j]]
               poorReg[1] = (count / countrds) * 100;
               poor_roads.push(poorReg);
          }

          // extract poor roads data without percentages for rendering
          for (let j = 0; j < regions.length; j++) {
               let goodReg = [];
               let count = 0;
               for(let i = 0; i < data.length; i++) {
                   if (data[i]['region'] === regions[j]) {
                         count++;
                    }
               }
               goodReg[0] = regions[j];
               goodReg[1] = count;
               poor_roads_no_percent.push(goodReg);
          }
          barsGen(poor_roads_no_percent, 300, 470, 2, "svg#poor_no_cent", 2);
          genLabelsIn(poor_roads_no_percent, 300, 470, 2, "svg#poor_no_cent", null, 2);
          genLabelsDown(poor_roads_no_percent, 300, 470, 2, "svg#poor_no_cent");
          genTitle(130, 380, "svg#poor_no_cent", "No. of poor roads");
          barsGen(poor_roads, 300, 470, 2, "svg#poor_rds", 5);
          genLabelsIn(poor_roads, 300, 470, 2, "svg#poor_rds", "%", 5);
          genLabelsDown(poor_roads, 300, 470, 2, "svg#poor_rds");
          genTitle(130, 380,"svg#poor_rds", "percentage no. of poor roads");
	})
    })

     // load and extract fair roads data with percentages for rendering
    $.get("/api/v1/allFairRoads", function (data) {
	$.get("/api/v1/stats", function (dat) {
	  console.log(data)
          let fair_roads = [];
          let fair_roads_no_percent = [];
          let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UWR"];
          for (let j = 0; j < regions.length; j++) {
               let fairReg = [];
               let count = 0;
               let countrds = 0;
               for(let i = 0; i < data.length; i++) {
                    if (data[i]['region'] === regions[j]){
                         count++;
                    }
               }
               fairReg[0] = regions[j];
	       countrds = dat[regions[j]];
               fairReg[1] = (count / countrds) * 100;
               fair_roads.push(fairReg);
          }

          // extract fair roads data without percentages for rendering
          for (let j = 0; j < regions.length; j++) {
               let fairReg = [];
               let count = 0;
               for(let i = 0; i < data.length; i++) {
                   if (data[i]["region"] === regions[j]) count++;
               }
               fairReg[0] = regions[j];
               fairReg[1] = count;
               fair_roads_no_percent.push(fairReg);
          }
          barsGen(fair_roads_no_percent, 300, 470, 2, "svg#fair_road_no_cent", 1);
          genLabelsIn(fair_roads_no_percent, 300, 470, 2, "svg#fair_road_no_cent", null, 1);
          genLabelsDown(fair_roads_no_percent, 300, 470, 2, "svg#fair_road_no_cent");
          genTitle(130, 380,"svg#fair_road_no_cent", "Number of fair roads");
          barsGen(fair_roads, 300, 470, 2, "svg#fair_rds", 3);
          genLabelsIn(fair_roads, 300, 470, 2, "svg#fair_rds", "%", 3);
          genLabelsDown(fair_roads, 300, 470, 2, "svg#fair_rds");
          genTitle(130, 380,"svg#fair_rds", "percentage number of fair roads");
	})
     })
})
