/** @jsx React.DOM */

/* Map component handles display & interaction with a map.
 * 
 */

var Map = React.createClass({
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
			<div className="mapContainer">
				<div className="map" ref="map"></div>
			</div>
		);
	}
});

module.exports = Map;