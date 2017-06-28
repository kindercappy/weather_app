function loadData(){
	var latitude;
	var longitude;

	var name = $('#name');
	var region = $('#region');
	var country = $('#country');
	var icon = $('#icon');
	var textWeather = $('#text');
	var tempC = $('#tempC');
	var tempF = $('#tempF');
	var fullAddress = $('#fullAddress');
	var tempBtn = $('#tempBtn');

	var url = 'https://api.apixu.com/v1/current.json?key=';
	var apiKey = 'f49ca59c4deb4ce1b8775704172706';
	var query = '&q=';
	// $('.degCel').hide();
	//get latitude and longitude
	navigator.geolocation.getCurrentPosition(function(position){
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
		var finalUrl = url + apiKey + query + latitude + "," + longitude ;
		// console.log(finalUrl);
		// console.log(text);
		var weatherRequestTimedout = setTimeout(function(){
			text.text("Oops couldnt fetch data...check back later");
		},5000);
		$.ajax({
			url: finalUrl,
			dataType: 'json',
			success: function(data){
				if (data !== "") {
					clearTimeout(weatherRequestTimedout);
				}
				var qData = data;
				// console.log(qData);
				var qName = data.location.name;
				//console.log(qName);
				var qCountry = data.location.country;
				//console.log(qCountry);
				var qRegion = data.location.region;
				//console.log(qRegion);
				var qIconUrl = data.current.condition.icon;
				// console.log(qIconUrl);
				var qText = data.current.condition.text;
				console.log(qText);
				var qTempC = data.current.temp_c;
				var qTempF = data.current.temp_f;
				var qFullAddress =  qName + ", " + qRegion + ", " + qCountry;
				//console.log(qTemp);
				if (qName !== "" && qTempC !== "") {
					// $('.degCel').show();
					$(".contentContainer").animate({
			          opacity: 0
			          },100,
			          function(){
			            $(this).animate({
			              opacity: 1
			            },200);
						name.text(qName);
						tempC.html(qTempC + "&deg;C");
						tempF.html(qTempF + "&deg;F");
						country.text(qCountry);
						region.text(qRegion);
						textWeather.text(qText);
						icon.attr("src", 'http:' + qIconUrl);
						fullAddress.text(qFullAddress);
			        });
				}
				
			}
			
		});
	},
	// error handling if acces to location denied
	function(error){
		if (error.code == error.PERMISSION_DENIED) {
			//console.log("No location");
				
		}
	});
}

$(document).ready(function(){
	loadData();
});