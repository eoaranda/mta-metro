# MTA-metro	🚇

[![NPM](https://nodei.co/npm/mta-metro.png)][nodei-url]

[![Build Status][travis-build]][travis-url] [![NPM Version][npm-version]][npm-url] [![Licence][licence]][npm-url] [![Made NYC][made-nyc]][npm-url]


MTA-metro is a wrapper for New York MTA Rail Roads real time data API.

The API´s included are:
1. Metro North
2. Long Island (LIRR)
3. ~~Subway~~ (Future dev)

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
Get real time schedule data from (MetroNorth & LIRR) given a single origin object and a destiny object.

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
The result of this call will be a JSON object with all the details of the Schedule from the time requested. 

For more examples please review the file ``test/test.js`` and for information on the Stations of Metro-North, LIRR or Subway visit: http://datamine.mta.info/list-of-feeds

## ToDo

- Create and Implement wrapper for NYC subway.
- Enable Subway status
- Improve schedule results, at the moment it only show times up to the end of the day in question.

## Updates

 - Added: MTA Dictionary , so you don´t have to learn the Metro-North or LIRR Lines and Stations, you can just start typing and you will get the object.
 - Colors property can also be found by line. 

Ex.
```javascript
const mm = require('mta-metro')
var lines = [mm.dic.MN.LINES.HUDSON,mm.dic.LIRR.LINES.MONTAUK];
var stations = [mm.dic.MN.STATIONS.GRANDCENTRAL, mm.dic.MN.STATIONS.YANKEESE153ST , mm.dic.LIRR.STATIONS.OYSTERBAY]
var lineColor = mm.dic.MN.LINES.HUDSON.color
```
- Added: Chai unit tests for CI 
- Added: Travis CI
- Improved: Faster use of the corresponding service Object (MN, LIRR)
- Removed: The need of adding the Service name ("MN" or "LIRR" ) when using the schedule promise.

## License

[MIT](https://opensource.org/licenses/MIT) 


[travis-build]: https://travis-ci.org/eaaranda/mta-metro.svg?branch=master
[travis-url]: https://travis-ci.org/eaaranda/mta-metro
[npm-version]: https://badge.fury.io/js/mta-metro.svg
[npm-url]: https://www.npmjs.com/package/mta-metro
[licence]: https://img.shields.io/npm/l/mta-metro.svg?maxAge=2592000
[made-nyc]: https://img.shields.io/badge/Made-NYC-blue.svg
[nodei-url]: https://nodei.co/npm/mta-metro/
