'use strict';
const FETCH      = require('node-fetch');
const PARSEXML   = require('xml2js').parseString;
const UTILS      = require('../utils');
const METRONORTH = require('./metronorth');
const LONGISLAND = require('./longisland');
const STATUS_URL = "http://web.mta.info/status/serviceStatus.txt";

module.exports = function mtaMetro(key) {
    this.key = key;
    var t = this;

    // return status of lines
    // @return array
    mtaMetro.prototype.status = function(linesArr) {         
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
                if (linesArr !== undefined && linesArr.length>=1) {
                    linesArr = UTILS.arrayUpper(linesArr);
                    metroStatus.forEach((line,index) => {
                        if(linesArr.indexOf(line.name.toUpperCase()) >= 0){
                            lineStatus.push(line);
                        }
                    }) 
                    resolve(lineStatus)
                } else {
                    //return full array
                    resolve(metroStatus)
                }
            }).catch(function (err) {
                reject("Error: Unable to parse data: " + err.message);
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
    }

    mtaMetro.prototype.schedule = function(options){

        if (!options.line || options.line == "") {
            throw new Error('No Railroad selected.');
        }

        switch(options.line) {
            case "MN":
                return METRONORTH.schedule(this.key,options);
                break;
            case "LIRR":
                return LONGISLAND.schedule(this.key,options);
                break;
            default:
                throw new Error('No Railroad selected.');
        }
        
    }

}