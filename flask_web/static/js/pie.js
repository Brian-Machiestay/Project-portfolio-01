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

    // generate tile for a pie chart
    function genTitle(x, y, id, title) {
        const svg = d3.select(id);
        const d = [title];
        svg.selectAll(".pieTitle").data(d).enter().append("text")
        .text(function (d) {
             return (title);
        })
        .attr("class", "pieTitle")
        .attr("x", x)
        .attr("y", y)
        .attr("style", "font: italic 20pt serif")
        .attr("fill", "blue")

   }

    $.get("http://192.168.33.10:5002/api/v1/allGoodRoads", function (data) {
	$.get("http://192.168.33.10:5002/api/v1/stats", function (dat) {
        let good_roads = [];
        let roads_no_percent = [];
        let regions = ["NOR","EAR","GAR","CER","BAR","ASR","WER","VOR","UER","UWR"]
        for (let j = 0; j < regions.length; j++) {
            let goodReg = [];
            let count = 0;
            let countrds = 0;
            for(let i = 0; i < data.length; i++) {
                    if (data[i]['region'] === regions[j]) count++;
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
                 if (data[i]['region'] === regions[j]){
                      count++;
                 }
            }
            goodReg[0] = regions[j];
	    countrds = dat[regions[j]]
            goodReg[1] = (count / countrds) * 100;
            good_roads.push(goodReg);
        }
        let dt_no_cent = pieDataset(roads_no_percent);
        let arcs_no_cent = arcGen(490, 350, "svg#good_no_cent", dt_no_cent);
        let arc_no_cent = arcPath(490, 350);
        regLabel(arcs_no_cent, arc_no_cent);
        numLabel(arcs_no_cent, arc_no_cent, null);
        genTitle(130, 380, "svg#good_no_cent", "No. of good roads");
        let dt = pieDataset(good_roads);
        let arcs = arcGen(490, 350, "svg#good_rds", dt);
        let arc = arcPath(490, 350);
        regLabel(arcs, arc);
        numLabel(arcs, arc, "%");
        genTitle(130, 380,"svg#good_rds", "percentage no. of good roads");
      })
    })

     // load and extract poor roads data with percentages for rendering
    $.get("http://192.168.33.10:5002/api/v1/allPoorRoads", function (data) {
	$.get("http://192.168.33.10:5002/api/v1/stats", function (dat) {
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
	     countrds = dat[regions[j]];
             poorReg[1] = (count / countrds) * 100;
             poor_roads.push(poorReg);
        }

        // extract poor roads data without percentages for rendering
        for (let j = 0; j < regions.length; j++) {
             let goodReg = [];
             let count = 0;
             for(let i = 0; i < data.length; i++) {
                 if (data[i]["region"] === regions[j]) count++;
             }
             goodReg[0] = regions[j];
             goodReg[1] = count;
             poor_roads_no_percent.push(goodReg);
        }
        let dt_no_cent = pieDataset(poor_roads_no_percent);
        let arcs_no_cent = arcGen(490, 350, "svg#poor_no_cent", dt_no_cent);
        let arc_no_cent = arcPath(490, 350);
        regLabel(arcs_no_cent, arc_no_cent);
        numLabel(arcs_no_cent, arc_no_cent, null);
        genTitle(130, 380, "svg#poor_no_cent", "No. of poor roads");
        let dt = pieDataset(poor_roads);
        let arcs = arcGen(490, 350, "svg#poor_rds", dt);
        let arc = arcPath(490, 350);
        regLabel(arcs, arc);
        numLabel(arcs, arc, "%");
        genTitle(130, 380,"svg#poor_rds", "percentage no. of poor roads");
      })
    })
    // load and extract fair roads data with percentages for rendering
    $.get("http://192.168.33.10:5001/api/v1/allFairRoads", function (data) {
	$.get("http://192.168.33.10:5002/api/v1/stats", function (dat) {
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
        let dt_no_cent = pieDataset(fair_roads_no_percent);
        let arcs_no_cent = arcGen(490, 350, "svg#fair_road_no_cent", dt_no_cent);
        let arc_no_cent = arcPath(490, 350);
        regLabel(arcs_no_cent, arc_no_cent);
        numLabel(arcs_no_cent, arc_no_cent, null);
        genTitle(130, 380,"svg#fair_road_no_cent", "Number of fair roads");
        let dt = pieDataset(fair_roads);
        let arcs = arcGen(490, 350, "svg#fair_rds", dt);
        let arc = arcPath(490, 350);
        regLabel(arcs, arc);
        numLabel(arcs, arc, "%");
        genTitle(130, 380,"svg#fair_rds", "percentage number of fair roads");
      })
    })
})
