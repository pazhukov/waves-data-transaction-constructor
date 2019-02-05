$(document).ready(function() {

	var dataArray = [];

	$('#addData').click(function() {
		
		waves = $('#wavesAddr').val();
		if(waves == "") {
			alert("Enter Waves address!");
			return;
		}
			
		key = $('#keyTxt').val();
		type = $('#typeTxt').val();
		value = $('#valueTxt').val();
		
		errorField = [];
		if(key == "") {
			errorField.push("key");
		}		
		if(type == undefined) {
			errorField.push("type");
		}	
		if(value == "") {
			errorField.push("value");
		}			
		
		if(errorField.length > 0) {
			errorMessage = "Enter fields ";
			for(i = 0; i < errorField.length; i++) {
				errorMessage = errorMessage + errorField[i];
				if((i + 1) != errorField.length ) {
					errorMessage = errorMessage + ", "
				}				
			}
			errorMessage = errorMessage + "!";
			alert(errorMessage);
			return;
		}

		if(type == "boolean") {

			if (!(value == 1 || value == "1" || value == 0 || value == "0")) {
				alert("For boolean type need enter 1 for TRUE or 0 for FALSE!");	
				return;
			}

		}
		
		count = dataArray.length;
		count = count + 1;

		tr = '<tr><td>' + count + '</td><td>' + key + '</td><td>' + type + '</td><td>' + value + '</td></tr>';
		$('#dataList tbody').append(tr);

		oneData = [key, type, value];
		dataArray.push(oneData);

		createJson();
 
	});

	function createJson() {

		json = "";
		json = json + '{ "type" : 12, "sender" : "' + $('#wavesAddr').val() + '", "fee" : 100000, "data" : [';
		for(i = 0; i < dataArray.length; i++) {
			json = json + '{"key" : "' + dataArray[i][0] + '", "type" : "' + dataArray[i][1] + '", "value" : ' + getValue(dataArray[i][1], dataArray[i][2]) + '}';
			if((i + 1) != dataArray.length ) {
				json = json + ','
			}
		}
		json = json + '], "version" : 1 }';
		$('#jsonTxt').val(json);
	}

	function getValue(type, value) {

		returnValue = "";

		if(type == "integer") {
			returnValue = value;
		} else if(type == "string") {
			returnValue = "\"" + value + "\"";
		} else if(type == "boolean") {

			if (value == 1 || value == "1") {
				returnValue = "true";
			}else if (value == 0 || value == "0") {
				returnValue = "false";
			}
		}

		return returnValue;

	}

});
