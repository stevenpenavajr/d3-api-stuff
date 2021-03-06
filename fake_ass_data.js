'use strict'

const ilp = require('ilp')
const spsp = require('ilp-protocol-spsp')
const debug = require('debug')('ilp-spsp')

// recipient is the payment pointer
// amount is 1 XRP = 10^9 units
async function pay (recipient, amount) {
  try {
    const plugin = ilp.createPlugin()
    debug('connecting plugin')
    await plugin.connect()

    debug('sending payment')
    await spsp.pay(plugin, {
      receiver: recipient,
      sourceAmount: amount
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  console.log('sent!')
  process.exit(0)
}

// sending 0.0000001 XRP
function run (xrp) {
  pay('$deavin.localtunnel.me', xrp)
}



var hour = 17,
	min = 30,
	currentRead = 6348;

var a = 5
for (var i=0; i < a; i++) {

	var rateAmount = Math.random() * Math.floor(20) + 10	// (0-1) * max + min
	if (22 < rateAmount <= 30)
		var priceType = "peak"
	else
		var priceType = "off peak"

	var meterDelta = Math.random() * (0.02048326 * 2) + .005	// 0.02048326 avg kWh/min in USA

	var dateTime = '12/16/2007 ' + hour.toString() + ':' + min.toString() + ':00"'
	var priceType = priceType
	var rateAmount = rateAmount / 100	// Amount in dollars
	var rateUnit = 'kWh'
	var meterNo = "05504"
	var currentRead = currentRead + meterDelta

	// Spliting meterDelta into 3 random parts that add up to meterDelta
	var sub1 = meterDelta * Math.random()
	var sub2 = (meterDelta - sub1) * Math.random()
	var sub3 = (meterDelta - sub1) - sub2

	//console.log('dateTime: ' + dateTime)
	//console.log('priceType: ' + priceType)
	//console.log('rateAmount: ' + rateAmount.toString())
	//console.log('rateUnit: ' + rateUnit)
	//console.log('meterNo: ' + meterNo.toString())
	//console.log('currentRead: ' + currentRead.toString())
	//console.log('sub1: ' + sub1.toString())
	//console.log('sub2: ' + sub2.toString())
	//console.log('sub3: ' + sub3.toString() + '\n')

	min += 1
	if (min >= 60) {
		hour += 1
		min = 0
	}
		
	var xrp = 0.45
	var moneyOwned = (meterDelta * rateAmount * xrp) * Math.pow(10,9)

	console.log(moneyOwned)
	run(moneyOwned)



}
