function keywordsHighlighter(options, remove) {
	var occurrences = 0;

	function highlight(node, pos, keyword, options) {
		var span = document.createElement("span");
		span.className = "highlighted";
		span.style.color = options.foreground;
		span.style.backgroundColor = options.background;

		var highlighted = node.splitText(pos);
		/*var afterHighlighted = */highlighted.splitText(keyword.length);
		var highlightedClone = highlighted.cloneNode(true);

		span.appendChild(highlightedClone);
		highlighted.parentNode.replaceChild(span, highlighted);

		occurrences++;
	}

	function addHighlights(node, keywords, options) {
		var skip = 0;

		var i;
		if (3 == node.nodeType) {
			for (i = 0; i < keywords.length; i++) {
				var keyword = keywords[i].toLowerCase();
				var pos = node.data.toLowerCase().indexOf(keyword);
				if (0 <= pos) {
					highlight(node, pos, keyword, options);
					skip = 1;
				}
			}
		}
		else if (1 == node.nodeType && !/(script|style|textarea)/i.test(node.tagName) && node.childNodes) {
			for (i = 0; i < node.childNodes.length; i++) {
				i += addHighlights(node.childNodes[i], keywords, options);
			}
		}

		return skip;
	}

	function removeHighlights(node) {
		var span;
		while (span = node.querySelector("span.highlighted")) {
			span.outerHTML = span.innerHTML;
		}

		occurrences = 0;
	}

	if (remove) {
		removeHighlights(document.body);
	}

	var keywords = options.keywords.split(",");
	delete options.keywords;
	addHighlights(document.body, keywords, options);

	chrome.runtime.sendMessage({
		"message": "showOccurrences",
		"occurrences": occurrences
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("returnOptions" == request.message) {
		if ("undefined" != typeof request.keywords && request.keywords) {
			keywordsHighlighter({
					"keywords": request.keywords,
					"foreground": request.foreground,
					"background": request.background
				},
				request.remove
			);
		}
	}
});

chrome.runtime.sendMessage({
	"message": "getOptions",
	"remove": false
});
