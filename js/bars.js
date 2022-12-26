$( function () {
    $.get("../js/Road-condition.json", function (data) {
        let good_roads = [];
        for(let i = 0; i < data.length; i++) {
            if (data[i]['Cond.'] === "Good") good_roads.push(data[i]);
       }
       d3.select("svg")
    })
});