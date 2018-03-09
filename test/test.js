const mm = require('../lib');

var mta = new mm.mtaMetro('<YOU-API-KEY>');

var lines = [mm.dic.MN.LINES.HUDSON,mm.dic.MN.LINES.NEWHAVEN,mm.dic.LIRR.LINES.MONTAUK];
mta.status(lines).then(function(result) {
	console.log(result)
}).catch(function (err) {
	console.log(err)
	});

// METRO NORTH EXAMPLE
let options = {
    from: mm.dic.MN.STATIONS.GRANDCENTRAL, //station obj
    to: mm.dic.MN.STATIONS.BEACON, //station obj
    //day:"YYYY-MM-DD", //optional if not provided it will use current
    //time:"HH:MM", //optional if not provided it will use current
}
mta.schedule(options).then(function(result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
});

// LIRR EXAMPLE
options = {
    from:mm.dic.LIRR.STATIONS.PENNSTATION, //station obj
    to: mm.dic.LIRR.STATIONS.JAMAICA, //station obj
    //day:"YYYY-MM-DD", //optional if not provided it will use current
    //time:"HH:MM", //optional if not provided it will use current
}
mta.schedule(options).then(function(result) {
    console.log(result)
}).catch(function (err) {
    console.log(err)
});
