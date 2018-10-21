"use strict";

const ilp = require("ilp");
const spsp = require("ilp-protocol-spsp");
const debug = require("debug")("ilp-spsp");

var iternations = 0;

// recipient is the payment pointer
// amount is 1 XRP = 10^9 units
async function pay(recipient, amount) {
  try {
    const plugin = ilp.createPlugin();
    debug("connecting plugin");
    await plugin.connect();

    debug("sending payment");
    await spsp.pay(plugin, {
      receiver: recipient,
      sourceAmount: amount
    });
  } catch (e) {
    console.error(e);
    throw e;
    // process.exit(1)
  }

  // console.log('sent!')
  return "sent!";
  // process.exit(0)
}

// sending 0.0000001 XRP
function run(moneyOwned) {
  pay("$kyna332.localtunnel.me", moneyOwned)
    .then(function(result) {
      // Do something with the result
      console.log("sent result!");
      // process.exit(1)
    })
    .catch(function(error) {
      // Handle error
      console.log("there was an error", e);
    });
}



var numOfDays = 183
var hour = 17
var min = 30
var currentRead = 6348;
var month = 5
var day = 5
var year = 2017

var loopiter = setInterval(function() {

  if (iternations > numOfDays) {
    clearInterval(loopiter);
    process.exit(1);
  }

  iternations += 1;

  var rateAmount = Math.random() * Math.floor(20) + 10; // (0-1) * max + min
  if (22 < rateAmount <= 30) var priceType = "peak";
  else var priceType = "off peak";

  var meterDelta = Math.random() * (0.02048326 * 2) + 0.005; // 0.02048326 avg kWh/min in USA

  var mnth = month
  var dy = day
  var hr = hour
  var mn = min

  var dateTime = month.toString() + "/" + day.toString() + "/" +
				year.toString() + hour.toString() + ":" + min.toString() + ':00"';
  var priceType = priceType;
  var rateAmount = rateAmount / 100; // Amount in dollars
  var rateUnit = "kWh";
  var meterNo = "05504";
  var currentRead = currentRead + meterDelta;

  // Spliting meterDelta into 3 random parts that add up to meterDelta
  var sub1 = meterDelta * Math.random();			// Air Conditioning
  var sub2 = (meterDelta - sub1) * Math.random();	// Oven
  var sub3 = meterDelta - sub1 - sub2;				// Entertainment System

  // console.log('dateTime: ' + dateTime)
  // console.log('priceType: ' + priceType)
  // console.log('rateAmount: ' + rateAmount.toString())
  // console.log('rateUnit: ' + rateUnit)
  // console.log('meterNo: ' + meterNo.toString())
  // console.log('currentRead: ' + currentRead.toString())
  // console.log('sub1: ' + sub1.toString())
  // console.log('sub2: ' + sub2.toString())
  // console.log('sub3: ' + sub3.toString() + '\n')

  min += 1;
  if (min >= 60) {
    hour += 1;
    min = 0;
    if (hour >= 24)
      hour = 0
  }
		
  if (day == 30) {
	day = 1
	month += 1
	if (month >= 13) {
	  month = 1
	  year += 1
	}
  }

  var xrp = 0.45;
  var moneyOwned = Math.floor(meterDelta * rateAmount * xrp * Math.pow(10, 9));
  run(moneyOwned);

  console.log('iterations: ' + iternations.toString() + '\tUnits: ' + moneyOwned.toString())
}, 2000);
