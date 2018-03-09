'use strict';
const FETCH      = require('node-fetch');
const UTILS      = require('../utils');
const API_URL    = "https://mnorth.prod.acquia-sites.com/wse/Trains";
const API_FILE   = "tripstatus.json";
const API_VER    = "v3";


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
            route = options.from.id + "/" + options.to.id;
        }else{
            throw new Error('You forgot to provide an origin or a destiny.');
        }
    
        //date part
        if (options.day >= UTILS.nowDate()) {
            let dayParts= options.day.split("-");
            dayroute = dayParts[0] + "/" + dayParts[1] + "/" + dayParts[2];
        } else {
            let dayParts= UTILS.nowDate().split("-");
            dayroute = dayParts[0] + "/" + dayParts[1] + "/" + dayParts[2];
        }
    
        //time part
        if (options.time >= UTILS.nowTime) {
            timeroute = options.time.replace(/:/g, '');
        } else { 
            timeroute = UTILS.nowTime().replace(/:/g, '');
        }
        
        let json_req_url = API_URL + "/" + API_VER + "/" + route + "/DepartBy/" + dayroute  + "/" + timeroute + "/" + this.key + "/" + API_FILE;
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