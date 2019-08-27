/**
 * 
 */

var emptySelectedDropDownValue = "<option disabled selected value> -- select an option -- </option>";

window.addEventListener('load', function(){
	loadBrands();
	loadCarriers();
}, false )


function load(url, callback){
	var xhttp;
	  xhttp=new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	callback(this);
	    }
	 };
	  xhttp.open("GET", url, true);
	  xhttp.send();
}



function loadBrands(fieldName){
	if(!fieldName){
		fieldName = "brand";
	}
	load("/devices.php?action=load_brands", function(resp){
		console.log(resp)
		let dropDown = document.getElementsByName(fieldName)[0]
		console.log(dropDown)
		updateOptions(dropDown, JSON.parse(resp.response))
	})
	
}

function loadCarriers(fieldName){
	if(!fieldName){
		fieldName = "carrier";
	}
	load("/devices.php?action=load_carriers", function(resp){
		console.log(resp)
		let dropDown = document.getElementsByName(fieldName)[0]
		console.log(dropDown)
		updateOptions(dropDown, JSON.parse(resp.response))
	})
}

function updateOptions(dropDownList, options){
	console.log(options)
	dropDownList.innerHTML = emptySelectedDropDownValue;
	for ( let i = 0; i<options.length; i++) {
		let elem = options[i]
		console.log(elem)
		let option = document.createElement("option")
		option.value = elem.id
		option.innerHTML = elem.name
		console.log(option)
		dropDownList.options.add(option)
	}
}