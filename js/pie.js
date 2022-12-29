$(function () {

    // generate pie chart
    function pieGen(data, height, width, padding, id, scale) {
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
    })
    pieGen(good_roads, 300, 470, 2, "svg#good_no_cent", 2);
})