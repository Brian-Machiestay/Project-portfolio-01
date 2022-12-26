$( function () {
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
       let svg = d3.select("svg");
       let h = 300;
       let w= 500;
       let pad = 2;
       svg.selectAll("rect").data(good_roads).enter().append("rect")
       .attr("x", function(d, i) {
            console.log(d);
            return (i * (w / good_roads.length))
       })
       .attr("y", function (d) {
            return (h - d[1] * 15);
       })
       .attr("width", function (d, i) {
            return (w / good_roads.length - pad)
       })
       .attr("height", function (d) {
            return (d[1] * 15);
       })
    })
})