function simulatedData(){
	var hour = 17;
	var min = 30;
	var currentRead = 6348;
	var i = 0;
		setInterval(function(i, currentRead){
			if(i < 60){
				var rateAmount = Math.random() * Math.floor(20) + 10;	// (0-1) * max + min
				if (22 < rateAmount <= 30)
					var priceType = "peak";
				else
					var priceType = "off peak";

				var meterDelta = Math.random() * (0.02048326 * 2) + .005;	// 0.02048326 avg kWh/min in USA
				var dateTime = '12/16/2007 ' + hour.toString() + ':' + min.toString() + ':00';
				var priceType = priceType;
				var rateAmount = rateAmount / 100;	// Amount in dollars
				var rateUnit = 'kWh';
				var meterNo = "05504";
				var currentRead = currentRead + meterDelta;

				// Spliting meterDelta into 3 random parts that add up to meterDelta
				var sub1 = meterDelta * Math.random();
				var sub2 = (meterDelta - sub1) * Math.random();
				var sub3 = (meterDelta - sub1) - sub2;

				min += 1;
				if (min >= 60) {
					hour += 1;
					min = 0;
				}
				console.log('dateTime: ' + dateTime);
				console.log('priceType: ' + priceType);
				console.log('rateAmount: ' + rateAmount.toString());
				console.log('rateUnit: ' + rateUnit);
				console.log('meterNo: ' + meterNo.toString());
				console.log('currentRead: ' + currentRead.toString());
				console.log('sub1: ' + sub1.toString());
				console.log('sub2: ' + sub2.toString());
				console.log('sub3: ' + sub3.toString() + '\n');
			}
		}, 60000, i++, currentRead);
}
