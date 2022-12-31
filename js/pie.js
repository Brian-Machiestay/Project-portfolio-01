$(function () {

    // generate arcs for pie chart
    function arcGen(width, height, id, piedata) {
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let w = width;
        let h = height;
        let out = w/4;
        let inner = 0;
        let arc = arcPath(width, height);
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
        .attr("transform", "translate(" + w / 2 + ", " + h / 2 + ")");
        arcs.append("path")
        .attr("fill", function(d, i) {
        return(color(i));
        })
        .attr("d", arc);
        return(arcs);
    }

    // generate the path that makes an arc
    function arcPath(width, height) {
        let w = width;
        let h = height;
        let out = w/4;
        let inner = 0;
        let arc = d3.arc().innerRadius(inner)
        .outerRadius(out);
        return(arc);
    }

    // generate pie chart dataset and add description to to generated data
    function pieDataset(data) {
        let pie = d3.pie();
        let dataset = [];
        for (let i = 0; i < data.length; i++) {
            dataset.push(data[i][1]);
        }
        
        let dat = pie(dataset);
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < dat.length; j++) {
                if (data[i][1] === dat[j].value) dat[j]['text'] = data[i][0];
            }
        }
        return(dat);
    }

    // label pie chart with description 
    function regLabel(arcs, arc) {
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
        })
        .attr("fill", "orange");
    }

    // label pie chart with values
    function numLabel(arcs, arc, extra_text) {
        arcs.append("text").attr("class", "label");
        arcs.selectAll(".label").text(function (d) {
            if (extra_text !== null) return (Math.round(d.value) + "" + extra_text);
            return Math.round(d.value);   
        })
        .attr("transform", function(d) {
            center = arc.centroid(d);
            center[0]  = center[0] * 1.5 - 10;
            center[1]  = center[1] * 1.5;
            return ("translate(" + center + ")")
        });
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
            roads_no_percent.push(goodReg);  
        }

        // extract the relative number of good roads
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
        let dt_no_cent = pieDataset(roads_no_percent);
        let arcs_no_cent = arcGen(490, 350, "svg#good_no_cent", dt_no_cent);
        let arc_no_cent = arcPath(490, 350);
        regLabel(arcs_no_cent, arc_no_cent);
        numLabel(arcs_no_cent, arc_no_cent, null);
        let dt = pieDataset(good_roads);
        let arcs = arcGen(490, 350, "svg#good_rds", dt);
        let arc = arcPath(490, 350);
        regLabel(arcs, arc);
        numLabel(arcs, arc, "%");
    })
})