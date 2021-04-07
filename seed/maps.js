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
		
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

        var infowindow = new google.maps.InfoWindow();
		
		map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
        });
		
		function placeMarkerAndPanTo(latLng, map) {
			DeleteMarkers();
			var marker = new google.maps.Marker({
			  position: latLng,
			  map: map
			});
			markers.push(marker);
			map.panTo(latLng);
			document.getElementById('latLng-input').value = latLng;
			geocodeLatLng(map);
		}

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
		  placeMarkerAndPanTo(place.geometry.location, map);
        });
		
		function geocodeLatLng(map) {
			var infowindow = new google.maps.InfoWindow();
			var geocoder = new google.maps.Geocoder;
			var input = document.getElementById('latLng-input').value.replace('(','').replace(')','');
			var latlngStr = input.split(',', 2);
			var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
			geocoder.geocode({'location': latlng}, function(results, status) {
				  if (status === 'OK') {
					if (results[0]) {
					  //map.setZoom(13);
					  var marker = new google.maps.Marker({
						position: latlng,
						map: map
					  });
					  infowindow.setContent(results[0].formatted_address);
					  infowindow.open(map, marker);
					  document.getElementById('pac-input').value = results[0].formatted_address;
					  markers.push(marker);
					  // Guardar seleccion
					  var serviciousuario = JSON.parse(localStorage.getItem('serviciousuario'));
					  serviciousuario.direccion = document.getElementById('pac-input').value;
					  serviciousuario.coordenadas = document.getElementById('latLng-input').value;
					  localStorage.setItem('serviciousuario', JSON.stringify(serviciousuario));
					} else {
					  window.alert('No results found');
					}
				  } else {
					window.alert('Geocoder failed due to: ' + status);
				  }
			});
		}
		
		document.getElementById('mylocation').addEventListener('click', function() {
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				placeMarkerAndPanTo(latLng, map);
			  }, function() {
				handleLocationError(true, infowindow, map.getCenter());
			  });
			} else {
			  handleLocationError(false, infowindow, map.getCenter());
			}
        });
		
		function DeleteMarkers() {
			for (var i = 0; i < markers.length; i++) {
				markers[i].setMap(null);
			}
			markers = [];
		};

      }