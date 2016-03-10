var code;
var weatherType;

module.exports = function(number){
	code = number.toString();
	switch(code.charAt(0)) {
	    case '2':
	        weatherType = "Thunderstorm"
	        break;
	    case '3':
	        weatherType = "Drizzle"
	        break;
	    case '5':
	        weatherType = "Rain"
	        break;
	    case '6':
	        weatherType = "Snow"
	        break;
	    case '7':
	    	if(code.charAt(1) == 4){
	    		weatherType = "Fog"
	    	}else{weatherType = "Atmo is messy"}
	        break;
	    case '8':
	    	if(code.charAt(2) == 0){
	    		weatherType = "Clear"
	    	}else{weatherType = "Cloudy"}
	        break;
	    case '9':
	    	if(code.charAt(1) == 0){
	    		weatherType = "Extreme"
	    	}else if (code.charAt(1) == 5 && (code.charAt(2) == 1 || code.charAt(2) == 2 || code.charAt(2) == 3)){
	    		weatherType = "Calm"
	    	}else {weatherType = "Maybe windy, maybe a hurricane"}
	        break;
	    default: weatherType = "We are not prepared for this weather..."
	} 
	return weatherType
}