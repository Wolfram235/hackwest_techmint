
var a;
var mapv;
function getLocation(map) {
    mapv=map;
  if (navigator.geolocation) {
 var  t= navigator.geolocation.getCurrentPosition(showPosition);

  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.log( "Latitude: " + position.coords.latitude +
  "Longitude: " + position.coords.longitude);
    
    var firebaseConfig = {
    apiKey: "AIzaSyA9OPN4SW-2XwgUZedkwvRPCXLBpcS1LRA",
    authDomain: "hackwest-5487e.firebaseapp.com",
    databaseURL: "https://hackwest-5487e.firebaseio.com",
    projectId: "hackwest-5487e",
    storageBucket: "hackwest-5487e.appspot.com",
    messagingSenderId: "738055525872",
    appId: "1:738055525872:web:bed1e5990cba6b21b5b935"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    
    var username=getCookie("username");
    
  firebase.database().ref('/'+username ).set({
    Latitude: position.coords.latitude,
    Longitude: position.coords.longitude,
   
  });
var starCountRef = firebase.database().ref('/');
starCountRef.on('value', function(snapshot) {
    var lat=[];
    var lng=[];
    snapshot.forEach(function(snapshot){
        var obj = snapshot.val();
        console.log(obj);
        lat.push(obj.Latitude);
        lng.push(obj.Longitude);
    })
    //console.log(lat,lng);
 a = sum(lat,lng);
    console.log("final"+a);
    
});
    return a;
}
function sum(lat,lng){
    var sumlat=0,sumlng=0;
    var c=0.000;
   console.log(lat,lng)
    for (var a in lat)
        {
            sumlat+=lat[a];
            c++;
          //  console.log()
        }
    for (var b in lng)
        {
            sumlng+=lng[a];
        }
    console.log(sumlat/c,sumlng/c);
    sumlat=sumlat/c;
    sumlng=sumlng/c;
    var ret = [{lat:sumlat,lng:sumlng}];
    
     var image = {
    url: './bus1.png',
    // This marker is 20 pixels wide by 32 pixels high.
    scaledSize: new google.maps.Size(50 , 50),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
    
    
     var marker = new google.maps.Marker({
    position: new google.maps.LatLng(sumlat,sumlng),
    map: map,
    title: 'The bus!!!',
    icon :image
  });
             console.log("ssssssss")
             marker.setMap(map);
    return ret
    
} 

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}