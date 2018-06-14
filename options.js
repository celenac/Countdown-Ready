console.log("running options.js");

// Add listener after whole HTML document has been loaded
document.addEventListener('DOMContentLoaded', function() {
	console.log("DOMcontentedLoaded");
	displaySettings();
	document.getElementById("save_btn").addEventListener("click", saveSettings);  
});


function displaySettings() {
	// Use default values "alert" and "no"
	default_settings = {
		alert_type: "alert",
		extra_alert: "no" 
	};
	chrome.storage.sync.get(default_settings, function(items) {
		if (items["alert_type"] == "alert") {
			document.querySelector('input[name="alert_type"][value="alert"]').checked = true;
		} else {
			document.querySelector('input[name="alert_type"][value="notification"]').checked = true;
		}

		if (items["extra_alert"] == "yes") {
			document.querySelector('input[name="extra_alert"][value="yes"]').checked = true;
		} else {
			document.querySelector('input[name="extra_alert"][value="no"]').checked = true;

		}
	});
}


function saveSettings() {
	console.log("saving settings");
	var alert_type_value = document.querySelector('input[name="alert_type"]:checked').value;
	var extra_alert_value = document.querySelector('input[name="extra_alert"]:checked').value;
	console.log("alert type: ", alert_type_value);
	chrome.storage.sync.set({
		alert_type : alert_type_value,
		extra_alert: extra_alert_value
	});
	document.getElementById("save_confirmation").innerHTML = "Settings saved";
}