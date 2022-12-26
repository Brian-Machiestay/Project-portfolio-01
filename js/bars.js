$( function () {
     // generate bars
     function bars_gen(data, height, width, padding, id) {
       let svg = d3.select(id);
       let h = height;
       let w= width;
       let pad = padding;
       svg.selectAll("rect").data(data).enter().append("rect")
       .attr("x", function(d, i) {
            console.log(d);
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

     // load and extract relevant data for rendering
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
        bars_gen(good_roads, 300, 500, 2, "svg#good_rds");
    })
})