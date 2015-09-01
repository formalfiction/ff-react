// https://developers.google.com/mobile/articles/fast_buttons

var clickbuster = {
	coordinates : [],
	preventGhostClick : function(x, y) {
	  clickbuster.coordinates.push(x, y);
	  window.setTimeout(clickbuster.pop, 250);
	},
	pop : function() {
	  clickbuster.coordinates.splice(0, 2);
	},
	onClick : function(e) {
	  for (var i = 0; i < clickbuster.coordinates.length; i += 2) {
	    var x = clickbuster.coordinates[i];
	    var y = clickbuster.coordinates[i + 1];
	    if (Math.abs(event.clientX - x) < 25 && Math.abs(e.clientY - y) < 25) {
	      e.stopPropagation();
	      e.preventDefault();
	    }
	  }
	},
}

if (typeof window !== "undefined") {
	document.addEventListener('click', clickbuster.onClick, true);
}

module.exports = clickbuster;