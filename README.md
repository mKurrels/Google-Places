# Google-Places

Google-Places will add a google places searchable map to any element you want. The only requirement is jQuery.

directions:  
* Add add-google-places.js to your project  
* Add map-style.css to your project  
* source add-google-places.js in the main html file  
* source map-style.css in main the html file  
* call the function 'buildMap' like so:


```
buildMap({
  API_KEY: YOUR_API_KEY,
  latitude: 37.7833,
  longitude: -122.4167,
  selector: 'body'      //css style selector for the element that will contain the map
});
```

(see example_index.html)

If you need an API KEY, you get one here: https://console.developers.google.com/flows/enableapi?apiid=maps_backend&keyType=CLIENT_SIDE&reusekey=true

If you don't want other people using your API KEY, make sure to enter your url under "Accept requests from these HTTP referrers (web sites)"
