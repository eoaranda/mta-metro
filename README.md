# MTA-metro	🚇

Simple node.js wrapper for the MTA Rail Roads API's real time data.

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

First, create a `MTAmetro` object with your API key.
```javascript
const mtaMetro = require('mta-metro')
var mta = new mtaMetro ('<YOU-API-KEY>')
```

### MTA terms of agreement
Please ensure of reading MTA rules & guidelines: http://datamine.mta.info/usage-rules-and-guidelines 

I am not responsible of any misuse of this package that could lead to a violation of the terms of agreements stated by the MTA.

### Line service status
Get the status of of any line from (``MetroNorth``,`` LIRR``, ``Subway``) or if left blank you will get ALL the status from all the services provided by MTA.

```javascript
	var lines = ['hudson','DANBURY','Montauk',];
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
	    line: "MN", //"MN" for Metro North RR or "LIRR" for Long Island RR
	    from: 1,
	    to:622,
	    day:"YYYY-MM-DD", //optional if not provided it will use current
	    time:"HH:MM", //optional if not provided it will use current
	}
```
For examples please review the file ``test/test.js``

For more information on the Stations for Metro-North, LIRR or Subway visit:
http://datamine.mta.info/list-of-feeds

## Dependencies

- [request](https://github.com/request/request): Simplified HTTP request client.
- [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js): XML to JSON.

## ToDo

- Add automated tests
- Create and Implement wrapper for NYC subway, so ALL 3 Rail transports are contained in 1 package.
- Append colors into the line results, using: http://web.mta.info/developers/resources/line_colors.htm


## License

[MIT](https://opensource.org/licenses/MIT) 

