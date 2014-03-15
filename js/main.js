
$(document).ready(function(){
    $("form").change(function(event){
    	number = $("#number").val();
    	street = $("#street").val();
		zipcode = $("#zipcode").val();
		city = $("#city").val();
		country = $("#country").val();
		if (street != "" && number!=""&& city!=""&& zipcode!=""&& country!=""){
			google_url = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address="+number+ "+" +street +"+"+ zipcode+"+"+ city+"+"+ country;
			$.ajax({
				url:google_url,
				type:"POST",
				dataType:"json",
				success: function showResponse(response, status, xhr){
					good_result = processResponse(response);
					if (good_result != false){
						$("form .form-group input").each(function(){
							if (($(this).val()) != good_result[$(this).attr('id')] ){
								$(this).tooltip({
									"title":good_result[$(this).attr('id')],
									"trigger":"focus",
									"placement":"right",
								});
							} else {
								$(this).tooltip('destroy');
							}
						});
						$("form .form-group input").tooltip("show");
					}
					
				}
			});
		}
		
    });
}); 

function processResponse(response){
	//This function process the response to get the correct address elements from google geocode response
	var founded_number, founded_street, founded_zipcode, founded_city, founded_country;
	if (response["status"] == "ZERO_RESULTS"){
		return false;
	} else {
		address_components = response["results"][0]["address_components"];
		$.each(address_components, function(i, v){
			if ($.inArray("street_number", v["types"]) != -1) founded_number = v["long_name"];
			if ($.inArray("route", v["types"]) != -1) founded_street = v["long_name"];
			if ($.inArray("locality", v["types"]) != -1) founded_city = v["long_name"];
			if ($.inArray("postal_code", v["types"]) != -1) founded_zipcode = v["long_name"];
			if ($.inArray("country", v["types"]) != -1) founded_country = v["long_name"];
			
		});
		return {"number": founded_number,
				"street": founded_street,
				"zipcode": founded_zipcode,
				"city":founded_city,
				"country":founded_country};
	}
	
	
}
