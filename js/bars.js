$( function () {
    $.get("./Road-condition.json", function (data) {
       console.log(data); 
    }, 'json')
});