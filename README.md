# MTA-metro	🚇

[![NPM](https://nodei.co/npm/mta-metro.png)](https://nodei.co/npm/mta-metro/)

Simple node.js wrapper for New York MTA Rail Roads real time data.

1. Metro North
2. Long Island (LIRR)

## Installation

This is a Node.js module available through the npm registry.

```sh
npm install mta-metro --save
```

## Quick Start

In order to use the MTA real-time APIs, you will need an MTA API key from here: 
http://datamine.mta.info/user/register

First, create a `mtaMetro` object with your API key.
```javascript
const mm = require('mta-metro')
var mta = new mm.mtaMetro('<YOU-API-KEY>')
```
## Updates

 - Added: MTA Dictionary , so you don´t have to learn Metro-North or LIRR Lines and Stations, you can just start typing and you will get the object.
 Ex.
```javascript
const mm = require('mta-metro')
var  lines = [mm.dic.MN.LINES.HUDSON,mm.dic.LIRR.LINES.MONTAUK];
var stations = [mm.dic.MN.STATIONS.GRANDCENTRAL, mm.dic.MN.STATIONS.YANKEESE153ST , mm.dic.LIRR.STATIONS.OYSTERBAY]
var lineColor = mm.dic.MN.LINES.HUDSON.color
```
- Added: Unit tests for CI
- Improved: Use of corresponding service Object (MN, LIRR)
- Added: Travis CI

### MTA terms of agreement
Please ensure of reading MTA rules & guidelines: http://datamine.mta.info/usage-rules-and-guidelines 

I am not responsible of any misuse of this package that could lead to a violation of the terms of agreements stated by the MTA.

### Line service status
Get the status of of any line from (``MetroNorth`` or `` LIRR``) or if left blank you will get the status of ALL the lines of this services. 

```javascript
	var lines = [mm.dic.MN.LINES.HUDSON,mm.dic.MN.LINES.NEWHAVEN,mm.dic.LIRR.LINES.MONTAUK];
	mta.status(lines).then(function(result) {
	    console.log(result)
	}).catch(function (err) {
	    console.log(err)
	});
```

### Schedule
Get real time schedule data from (MetroNorth & LIRR) given a single origin id and a destiny id.

```javascript
	let options = {
    	from: mm.dic.MN.STATIONS.GRANDCENTRAL, //station obj
    	to: mm.dic.MN.STATIONS.BEACON, //station obj
	    day:"YYYY-MM-DD", //optional if not provided it will use current
	    time:"HH:MM", //optional if not provided it will use current
	}
```
```javascript
	mta.schedule(options).then(function(result) {
	    console.log(result)
	}).catch(function (err) {
	    console.log(err)
	});
```
The result of this call will be  JSON object with all the details of the Schedule from the time requested to the end of the day in question.

For more examples please review the file ``test/test.js`` and for information on the Stations of Metro-North, LIRR or Subway visit: http://datamine.mta.info/list-of-feeds

## Dependencies

- [request](https://github.com/request/request): Simplified HTTP request client.
- [xml2js](https://github.com/Leonaidas-from-XIV/node-xml2js): XML to JSON.

## ToDo

- Create and Implement wrapper for NYC subway, so ALL 3 Rail transports are contained in 1 package.
- Enable Subway status
- Improve schedule only show times up to the end of the day in question.

## License

[MIT](https://opensource.org/licenses/MIT) 