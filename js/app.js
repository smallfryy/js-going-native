// make API dance 
// working! bowchicka-wow-wow!
var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9e6435a5c19133a2125890534ed0ed98&per_page=10&format=json&nojsoncallback=1";
// async call 
function getHTTP(url, callBack) {
  
  var httpRequest = new XMLHttpRequest();
    
    httpRequest.onreadystatechange = function() {
      // if http is ready to go and 200 a-ok error, then load this up
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        // collect JSON object 
        var data = JSON.parse(httpRequest.responseText);
        // transform scary JSON into data in grid
          if (callBack) 
              callBack(data);
          } else {error: "there was a problem"}
      }

  httpRequest.open('GET', url);
  httpRequest.send(); // asych request sent to server 
};

// print one JSON photo object
function printOneJSONObject(photoJSON){
  console.log(photoJSON.title);
  console.log(photoJSON.id);
}; 

// return array of JSON photo objects
function returnPhotoArray(scaryJSON){
  return scaryJSON['photos'].photo;
};
 
function getAndPrintFirstPhoto(data){
  console.log(data);
  // get one photo 
  var photos = returnPhotoArray(data);
  // print one JSON photo
  console.log(photos);
  for (i = 0; i < photos.length; i++) {
    // console.log(photos[i]);
    // printOneJSONObject(photos[i]);
    buildImageUrl(photos[i]);
    appendPhotoToGrid(photos[i]);
    buildAmazingDiv(photos[i]);
  }
};

// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
function buildImageUrl(photo){
  // build img URL 
  var imgElement = '<img src="https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg" />';
  appendPhotoToGrid(photo, imgElement);
  buildAmazingDiv(photo, imgElement)
};

function appendPhotoToGrid(photo, imgElement){
  // select photogrid and append div
  var iDiv = document.createElement('thumbnail'); 
  iDiv.innerHTML = photo.title + imgElement;
  document.getElementById('photo-grid').appendChild(iDiv);
  buildAmazingDiv(photo, imgElement);
}; 

function buildAmazingDiv(photo){
  var imgElement = '<img src="https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg" />';
  var picture = "<div class=thumbnail>" + photo.title + imgElement+"</div>";
};

// getHTTP(apiURL, getAndPrintFirstPhoto); 

