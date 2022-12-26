
$( function () {
     // generate bars
     function barsGen(data, height, width, padding, id) {
       let svg = d3.select(id);
       let h = height;
       let w= width;
       let pad = padding;
       svg.selectAll("rect").data(data).enter().append("rect")
       .attr("x", function(d, i) {
            return (i * (w / data.length))
       })
       .attr("y", function (d) {
            return (h - d[1] * 15);
       })
       .attr("width", function (d, i) {
            return (w / data.length - pad)
       })
       .attr("height", function (d) {
            return (d[1] * 15);
       })
       .attr("fill", function (d) {
          return ("rgb(0, 0," + Math.round(d[1] * 10) + ")");
       })

       
     }

     // generate in-bars labels
     function genLabels(data, height, width, padding, id) {
       let svg = d3.select(id);
       let h = height;
       let w= width;
       let pad = padding;
       
       svg.selectAll(".in_bars").data(data).enter().append("text")
       .text( function (d) {
          return(Math.round(d[1]));
       })
       .attr("class", "in_bars")
       .attr("x", function(d, i) {
          return (i * (w / data.length) + 12)
       })
       .attr("y", function (d) {
          if (d[1] === 0) return (h - d[1] * 15);
          return (h - d[1] * 15 + 15);
       })
       .attr("fill", function (d) {
          if (d[1] === 0) return("black");
          return("white")
       });

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

     // load and extract good roads data for rendering
    $.get("../js/Road-condition.json", function (data) {
        let good_roads = [];
        let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UPW"]
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
            goodReg[1] = (count / countrds) * 100;
            good_roads.push(goodReg);
        }
        barsGen(good_roads, 300, 500, 2, "svg#good_rds");
        genLabels(good_roads, 300, 500, 2, "svg#good_rds")
    })
})