
var hour = 17,
	min = 30,
	currentRead = 6348;

for (var i=0; i < 60; i++) {
	var line = '\t\t{\n'

	var rateAmount = Math.random() * Math.floor(20) + 10	// (0-1) * max + min
	if (22 < rateAmount <= 30)
		var priceType = "peak"
	else
		var priceType = "off peak"

	var meterDelta = Math.random() * (0.02048326 * 2) + .005	// 0.02048326 avg kWh/min in USA

	var dateTime = '12/16/2007 ' + str(hour) + ':' + str(min) + ':00"'
	var priceType = priceType
	var rateAmount = rateAmount / 100	// Amount in dollars
	var rateUnit = 'kWh'
	var meterNo = "05504"
	var currentRead += meterDelta

	// Spliting meterDelta into 3 random parts that add up to meterDelta
	var sub1 = meterDelta * Math.random()
	var sub2 = (meterDelta - sub1) * Math.random()
	var sub3 = (meterDelta - sub1) - sub2

	if i == 659:
		line = line.substring(0, line.length-1)

}
