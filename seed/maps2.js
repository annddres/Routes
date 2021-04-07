    // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

	  var markers = [];

      function initMap() {
	  
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
		  mapTypeControl: true,
		  streetViewControl: false
		});
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
			  var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			  map.panTo(latLng);
			}, function() {
			  handleLocationError(true, infowindow, map.getCenter());
			});
		  } else {
			handleLocationError(false, infowindow, map.getCenter());
		}
		
        var infowindow = new google.maps.InfoWindow();	
		
		var n = 1;
		var serviciosusuario = JSON.parse(localStorage.getItem('serviciosusuario'));
		serviciosusuario.forEach(function (su) {
			var input = su.coordenadas.replace('(','').replace(')','');
			var latlngStr = input.split(',', 2);
			var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
			placeMarker(latlng, map, n);
			n++;
        });

		function placeMarker(latLng, map, n) {
			var marker = new google.maps.Marker({
			  position: latLng,
			  map: map,
			  icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+n+'|FE6256|000000'
			});
			markers.push(marker);
		}		

      }