var ports = [];

console.log("running background.js");

update();

// update everytime the storage changes (i.e. everytime a new deadline to count down to is set)
chrome.storage.onChanged.addListener(update);
chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.msg == 'call update') {
		update();
	}
});

function update() {
	console.log("something in storage changed");

	var stored_data;
	chrome.storage.local.get(["datetime"], function(result) {
		var stored_data = result.datetime;
		if (typeof stored_data === 'undefined') {
			stored_data = null;
			console.log("none in storage");
			// chrome.runtime.sendMessage({msg: "create new"});
		} else {
			console.log(stored_data);
			// chrome.runtime.sendMessage({msg: "datetime exists in storage"});
		}

		// You can then set upn the proper popup for the next click or even switch to it
		console.log("stored data: ");
		console.log(stored_data);
		if (stored_data != null) {
			// chrome.runtime.sendMessage({datetime_data: stored_data});
			chrome.browserAction.setPopup({popup: "popup_countingdown.html"});
			console.log("switching to popup progress.html");
		} else {
			chrome.browserAction.setPopup({popup: "popup_startpage.html"});
		}

	});
}
