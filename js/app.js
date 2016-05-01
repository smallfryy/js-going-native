// make API dance 
var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=13b1d783bf00e8dcbd3c45f47097c796&tags=tarot&per_page=16&format=json&nojsoncallback=1";
// async call 
function getHTTP(url, callBack) {
  
  var httpRequest = new XMLHttpRequest();
    
    httpRequest.onreadystatechange = function() {
      // if http is ready to go and 200 a-ok error, then load this up
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        // collect JSON object 
        var data = JSON.parse(httpRequest.responseText);
        // transform scary JSON into data in thumbnail grid
          if (callBack) 
              callBack(data); 
          } else {error: "there was a problem"}
      }
  httpRequest.open('GET', url);
  httpRequest.send(); // asych request sent to server 
};

function returnPhotoArray(scaryJSON){
  return scaryJSON['photos'].photo;
};
 
// photo function factory 
function buildPhotoObject(data){
  var photos = returnPhotoArray(data);
  for (i = 0; i < photos.length; i++) {
    buildImageUrl(photos[i]);
    // buildPhotoLightbox(photos[i]);
  }
};

function buildImageUrl(photo){ 
  var imgElement = '<img src="https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg" />';
  appendPhotoToGrid(photo, imgElement);
};

function appendPhotoToGrid(photo, imgElement){
  var iDiv = document.createElement('thumbnail'); 
  iDiv.innerHTML = '<div class=hey>' + imgElement + '<div class=phototitle>' + photo.title + '</div>' + '</div>';
  document.getElementById('photo-grid').appendChild(iDiv);
}; 

// getHTTP(apiURL, getAndPrintFirstPhoto); 
function onMouseOverImage(photo, thumbnail){
  thumbnail.onMouseOver(photo.title);
};


