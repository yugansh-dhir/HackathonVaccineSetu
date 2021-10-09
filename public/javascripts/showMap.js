/* <script>
    mapboxgl.accessToken = "<%- process.env.MAPBOX_TOKEN %>";
    var map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [79, 25], // starting position [lng, lat]
      zoom: 4, // starting zoom
    });
  </script> */

  mapboxgl.accessToken = 'pk.eyJ1IjoieXVnYW5zaGRoaXIiLCJhIjoiY2twdXM2ZzB6MGZ6eDJ4cDloZ3Z3bXl2eCJ9.8KBKw4hqgMXdyf6NIm3J0w';
  var map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: [79,27], // starting position [lng, lat]
      zoom: 4 // starting zoom
  });

//   <div class="card-text text-right">
//           <p><%= center['lat'] %>, <%= center['long'] %></p>
//         </div>
//         <div id="map" style="width: 400px; height: 300px"></div>
//         <script>
//           mapboxgl.accessToken = "<%- process.env.MAPBOX_TOKEN %>";
//           var lat = "<%= center['lat'] %>";
//           var long = "<%= center['long'] %>";
//           var map = new mapboxgl.Map({
//             container: "map", // container ID
//             style: "mapbox://styles/mapbox/streets-v11", // style URL
//             center: [long, lat], // starting position [lng, lat]
//             zoom: 8, // starting zoom
//           });
//         </script>



//===================result route code to access coordinates using city, state accessed form pincode=======
	// var city,state;
// 	var cityUrl = "https://api.postalpincode.in/pincode/"+pinQuery;
// 	request(cityUrl, async(error, response, body)=>{
// 		var cities= JSON.parse(body);
// 		console.log(cities[0].PostOffice[0].Block);
// 		console.log(cities[0].PostOffice[0].State);
// 		var city=cities[0].PostOffice[0].Block;
// 		var state=cities[0].PostOffice[0].State;

// 		// console.log(body);
// 		var q = city+", "+ state;
// 	console.log(q);
// 	const geoData = await geocoder.forwardGeocode({
// 		// query:'pathankot, punjab',
// 		query:q,
// 		limit: 1
// 	}).send()
// 	// console.log(geoData.body);
// 	// console.log(query);
// 	const geoCoordinates=geoData.body.features[0].geometry.coordinates;
// // res.render("results", {geoCoordinates: geoCoordinates});
// 	// console.log(geoData.body.features[0].geometry.coordinates);
// 	console.log(geoCoordinates);
// 	})
	
