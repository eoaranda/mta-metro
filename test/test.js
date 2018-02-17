const mtaMetro = require('../lib');
var mta = new mtaMetro('<YOU-API-KEY>');


var lines = ['hudson','DANBURY','Montauk'];
mta.status(lines).then(function(result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
});


let options = {
    line: "MN", //"MN" for Metro North RR or "LIRR" for Long Island RR
    from: 1,
    to:622,
    //day:"YYYY-MM-DD", //optional if not provided it will use current
    //time:"HH:MM", //optional if not provided it will use current
}

mta.schedule(options).then(function(result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
});


var opt = {
    line: "LIRR", //"MN" for Metro North RR or "LIRR" for Long Island RR
    from: "AVL",
    to:"BSR",
    //day:"YYYY-MM-DD", //optional if not provided it will use current
    //time:"HH:MM", //optional if not provided it will use current
}

mta.schedule(opt).then(function(result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
});



