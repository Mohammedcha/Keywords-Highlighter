function loadOptions() {
	if ("undefined" != typeof localStorage) {
		document.getElementById("textareaKeywords").value = localStorage.getItem("keywords");
		document.getElementById("colorForeground").value = localStorage.getItem("foreground") || "#000000";
		document.getElementById("colorBackground").value = localStorage.getItem("background") || "#ffff00";

		var showOccurrences = localStorage.getItem("showOccurrences");
		showOccurrences = "true" == showOccurrences || null == showOccurrences;
		document.getElementById("checkboxShowOccurrences").checked = showOccurrences;
	}
}

function saveOptions() {
	if ("undefined" != typeof localStorage) {
		localStorage.setItem("keywords", document.getElementById("textareaKeywords").value);
		localStorage.setItem("foreground", document.getElementById("colorForeground").value);
		localStorage.setItem("background", document.getElementById("colorBackground").value);
		localStorage.setItem("showOccurrences", document.getElementById("checkboxShowOccurrences").checked);
	}
}
