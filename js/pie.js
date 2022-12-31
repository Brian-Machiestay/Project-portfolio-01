$(function () {

    // generate arcs for pie chart
    function arcGen(width, height, id, piedata) {
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let w = width;
        let h = height;
        let out = w/4;
        let inner = 0;
        let arc = d3.arc().innerRadius(inner)
        .outerRadius(out);
        let svg = d3.select(id);
        let dat = piedata;
        for (let i = 0; i < good_roads.length; i++) {
            for (let j = 0; j < dat.length; j++) {
                if (good_roads[i][1] === dat[j].value) dat[j]['text'] = good_roads[i][0];
            }
        }
        let arcs = svg.selectAll("g.arc")
        .data(dat)
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", "translate(" + 250 + ", " + 200 + ")");
        arcs.append("path")
        .attr("fill", function(d, i) {
        return(color(i));
        })
        .attr("d", arc);
        return(arcs);
    }

    // generate pie chart dataset and add description to to generated data
    function pieDataset(data) {
        let pie = d3.pie();
        let dataset = [];
        for (let i = 0; i < data.length; i++) {
            dataset.push(data[i][1]);
        }
        
        let dat = pie(dataset);
        for (let i = 0; i < dataset.length; i++) {
            for (let j = 0; j < dat.length; j++) {
                if (dataset[i][1] === dat[j].value) dat[j]['text'] = dataset[i][0];
            }
        }
        return(dat);
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
            goodReg[1] = count;
            good_roads.push(goodReg);  
        }
        let dt = pieDataset(good_roads);
        let arcs = arcGen(490, 350, "svg#good_no_cent", dt);
       
        arcs.append("text")
        .attr("class", "val")
        .attr("transform", function(d) {
            center = arc.centroid(d);
            center[0]  = center[0] *2.4 + 7;
            center[1]  = center[1] * 2.4;
            
        return "translate(" + center + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d) {
        return d.text;
        });

        arcs.append("text").attr("class", "label");
        arcs.selectAll(".label").text(function (d) { 
            return d.value;   
        })
        .attr("transform", function(d) {
            center = arc.centroid(d);
            center[0]  = center[0] * 1.5 - 10;
            center[1]  = center[1] * 1.5;
            return ("translate(" + center + ")")
        });
    })
})