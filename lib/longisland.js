'use strict';
const FETCH      = require('node-fetch');
const UTILS      = require('../utils');
const API_URL    = "https://traintime.lirr.org/api/TrainTime?api_key=";


module.exports = {
  
    // returns an array with the schedule
    schedule: function(key,options){
        this.key = key;
        
        var route = "",
            dayroute = "",
            timeroute = "",
            debug = false;
        
        if (!this.key || this.key == "" || this.key == "<YOU-API-KEY>") {
            throw new Error('MTA API key missing or incorrect.');
        }
        
        if (options.debug){
            debug = options.debug;
        }

        if (options.from.id && options.to.id) {
            route = "&startsta=" + options.from.id + "&endsta=" + options.to.id;
        }else{
            throw new Error('You forgot to provide an origin or a destiny.');
        }
    
        //date part
        if (options.day >= UTILS.nowDate()) {
            let dayParts= options.day.split("-");
            dayroute = "&year=" + dayParts[0] + "&month=" + dayParts[1] + "&day=" + dayParts[2];
        } else {
            let dayParts= UTILS.nowDate().split("-");
            dayroute = "&year=" + dayParts[0] + "&month=" + dayParts[1] + "&day=" + dayParts[2];
        }
    
        //time part
        if (options.time >= UTILS.nowTime) {
            let t = options.time.split(':');
            timeroute = "&hour=" + t[0] + "&minute=" + t[1];
        } else { 
            let t = UTILS.nowTime().split(':');
            timeroute = "&hour=" + t[0] + "&minute=" + t[1];
        }
        
        let json_req_url = API_URL + this.key + route + dayroute + timeroute;
        return new Promise(function (resolve, reject) {
            if(debug==true){
                resolve(json_req_url);
            }else{
                FETCH(json_req_url)
                .then(
                    data => resolve(data.json())
                ).catch(
                    err => reject("Error: Unable to parse response as JSON: " + err.message)
                );
            }
        });
    }
}