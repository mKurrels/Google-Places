
(function() {
  var _OPTIONS;

  window.buildMap = function (options) {
    _OPTIONS = options;
    
    var font_awesome = $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">');
    $('head').append(font_awesome);

    var $html = $([
      '<div id="search-box">',                                      
      '  <input id="pac-input" class="controls" type="text" placeholder="Search"><button id="trigger-search" class="icon"><i class="fa fa-search"></i></button>',
      '</div>', 
      '<div id="map"></div>', 
      '<script src="https://maps.googleapis.com/maps/api/js?key=',
              options.API_KEY,
      '&libraries=places&callback=initAutocomplete" async defer></script>'
    ].join("\n"));

    $(options.selector).append($html);
  };

  // This example adds a search box to a map, using the Google Place Autocomplete
  // feature. People can enter geographical searches. The search box will return a
  // pick list containing a mix of places and predicted search terms.

  window.initAutocomplete = function () {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: _OPTIONS.latitude, lng: _OPTIONS.longitude},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.BOTTOM_CENTER
      }
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('search-box'));

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    // [END region_getplaces]

    // Trigger search on button click
    document.getElementById('trigger-search').onclick = function () {

        var input = document.getElementById('pac-input');
        google.maps.event.trigger(input, 'focus');
        google.maps.event.trigger(input, 'keydown', {
            keyCode: 13
        });
    };

  };
})(); 
