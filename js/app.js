// make API dance 
// working! bowchicka-wow-wow!
var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9e6435a5c19133a2125890534ed0ed98&per_page=10&format=json&nojsoncallback=1";
// async call 
function getHTTP(url, callBack) {
  
  var httpRequest = new XMLHttpRequest();
    
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        // collect JSON object 
        var data = JSON.parse(httpRequest.responseText);
        // transform scary JSON into data in grid
          if (callBack) 
              callBack(data);
          } else {error: "there was a problem" }

      }

  httpRequest.open('GET', url);
  httpRequest.send(); // asych request sent to server 
}

getHTTP(apiURL, function(data) {
  console.log(data['photos'].photo);
});



