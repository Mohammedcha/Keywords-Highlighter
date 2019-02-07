document.addEventListener("DOMContentLoaded", function() {
	loadOptions();

	document.getElementById("buttonReset").addEventListener("click", function() {
		loadOptions();
	});

	document.getElementById("buttonSave").addEventListener("click", function() {
		saveOptions();
	});
});
