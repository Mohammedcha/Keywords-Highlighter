document.addEventListener("DOMContentLoaded", function() {
	loadOptions();

	document.getElementById("buttonCancel").addEventListener("click", function() {
		window.close();
	});

	document.getElementById("buttonSave").addEventListener("click", function() {
		saveOptions();
		window.close();

		chrome.runtime.sendMessage({
			"message": "getOptions",
			"remove": true
		});
	});
});
