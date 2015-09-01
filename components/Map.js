/** @jsx React.DOM */
var React = require('React');

/* Map component handles display & interaction with a map.
 * 
 */

var Map = React.createClass({displayName: "Map",
	componentDidMount : function () {
		this.initMap();
	},
	initMap : function () {
		var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8
    };
    this.map = new google.maps.Map(this.refs["map"].getDOMNode(), mapOptions);
	},
	render : function () {
		return (
			React.createElement("div", {className: "mapContainer"}, 
				React.createElement("div", {className: "map", ref: "map"})
			)
		);
	}
});

module.exports = Map;