'use strict';
const FETCH          = require('node-fetch');
const PARSEXML       = require('xml2js').parseString;
const UTILS          = require('../utils');
const METRONORTH     = require('./metronorth');
const LONGISLAND     = require('./longisland');
const MTADICTIONARY  = require('./mtadictionary');
const STATUS_URL     = "http://web.mta.info/status/serviceStatus.txt";

module.exports = {
    mtaMetro  : mtaMetro,
    dic       : MTADICTIONARY
}

function mtaMetro(key) {

    if(key === undefined){
        throw new Error('You forgot the key.');
    }

    this.key = key;
    var t = this;
    // return status of lines
    // @return array
    mtaMetro.prototype.status = function(linesArr) { 
        var linesNameArr = new Array();
        if(linesArr !== undefined && linesArr.length>=1){
            linesArr.forEach((l,i) =>{
                linesNameArr.push(l.name);
            })
        }
        return new Promise(function (resolve, reject) {
            var metroStatus;
            var statusData;
            var lineStatus  = new Array();
            //get the data and save it in local var
            t.statusData().then(function(xmlData) {
                PARSEXML(xmlData, function (err, data) {
                    data = UTILS.arrayClean(data);
                    //let SUBWAY = data.service.subway.line; //NYC Transit Subway Schedules & Stations
                    //let BUS = data.service.bus.line; //NYC Transit Bus Schedules
                    //let BT = data.service.BT.line;  //MTA Bridge & Tunnel Plaza Traffic
                    let LIRR = data.service.LIRR.line; //Long Island Rail Road Schedules
                    let MN   = data.service.MetroNorth.line; //Metro-North Railroad Schedules
                    metroStatus = MN.concat(LIRR);
                });
                if (linesNameArr !== undefined && linesNameArr.length>=1) {
                    linesNameArr = UTILS.arrayUpper(linesNameArr);
                    metroStatus.forEach((line,index) => {
                        if(linesNameArr.indexOf(line.name.toUpperCase()) >= 0){
                            lineStatus.push(line);
                        }
                    }) 
                    resolve(lineStatus)
                } else {
                    //return full array
                    resolve(metroStatus)
                }
            }).catch(function (err) {
                reject("Unable to parse data: " + err.message);
            });           
        });
    };

    // returns the raw data 
    mtaMetro.prototype.statusData = function(){
        return new Promise(function (resolve, reject) {
            FETCH(STATUS_URL)
                .then(function(rawData){
                    resolve(rawData.text())
                }).catch(
                    err => reject("Error: Unable to load data: " + err.message)
                );
        });
    };
    
    // return the shcedule
    mtaMetro.prototype.schedule = function(options){
        var MTAService;

        if (options.from === undefined || options.to === undefined) {
            throw new Error('Missing from / to parameters.');
        }

        if (options.from.service_name != options.to.service_name){
            throw new Error('This stations dont belong to the same service.');
        }else{
            MTAService = options.from.service_name;
        }

        switch(MTAService) {
            case "MN":
                return METRONORTH.schedule(this.key,options);
                break;
            case "LIRR":
                return LONGISLAND.schedule(this.key,options);
                break;
            default:
                throw new Error('No Railroad Service selected.');
        }

    }



}
