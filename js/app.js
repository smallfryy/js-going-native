// Defining global variables 
var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=13b1d783bf00e8dcbd3c45f47097c796&tags=tarot&per_page=24&format=json&nojsoncallback=1";
var photoArray = [];
var currentPhotoIndex = 0;

// Asynch Request
function getHTTP(url, callBack) {
  var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      // If http is ready with an 200 code, then load this up
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        // Collect JSON object 
        var data = JSON.parse(httpRequest.responseText);
        // Transform scary JSON into data in thumbnail grid
          if (callBack) 
              callBack(data); 

          } else {error: "there was a problem"};
      };
  httpRequest.open('GET', url);
  // asynch request sent to server 
  httpRequest.send(); 
};

function returnPhotoArray(scaryJSON){
  photoArray = scaryJSON['photos'].photo; 
  return scaryJSON['photos'].photo;
};
 
// Main Application Logic 
function buildPhotoViewer(data) {
  var photos = returnPhotoArray(data); 
  for (i = 0; i < photos.length; i++) { 
    appendPhotoToGrid(photos[i]); 
    buildPhotoLightBox(photos[i]);
  }
};

// User Interactions
function hideLightBox(){
  document.getElementById("lightbox-wrapper").style.visibility = "hidden";
};

function showLightBox(url) {
  var photo = photoArray[currentPhotoIndex];
  var title = photo.title;
  document.getElementById("lightbox-wrapper").style.visibility = "visible";
  document.getElementById('lightbox-image').innerHTML = '<img src="' + url + '"/>' + '<div class="title">' + title + '</div>' ;
};

// Next Image
function navigateRight(data) {
  var photo = photoArray[currentPhotoIndex];
  var imgURL = 'https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg';
  if (currentPhotoIndex < photoArray.length - 1) {
    currentPhotoIndex += 1;
    document.getElementById('lightbox-image').innerHTML = '<img src="' + imgURL + '"/>' + '<div class="title">' + photo.title + '</div>';
  }
}

// Previous Image
function navigateLeft(data){
  var photo = photoArray[currentPhotoIndex];
  var title = photo.title;
  var imgURL = 'https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg';
  if (currentPhotoIndex > 0){
    currentPhotoIndex -= 1;
    document.getElementById('lightbox-image').innerHTML = '<img src="' + imgURL + '"/>' + '<div class="title">' + photo.title + '</div>';
  }
};

// DOM Manipulation
function appendPhotoToGrid(photo){
  var thumbdiv = buildThumbnailDiv(photo);
  document.getElementById('photo-grid').appendChild(thumbdiv);
}; 

// Templating Section 
function buildThumbnailDiv(photo){
  var imgURL = 'https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg';
  var inner = '<div class="title">' + photo.title + '</div>' + 
                '<div class="image-box">' + 
                    '<img src="' + imgURL + '"/>' +
              '</div>';

  var iDiv = document.createElement("div");
  iDiv.setAttribute("class", "thumbnail");
  iDiv.setAttribute("onClick", "showLightBox(\'" + imgURL + "\')");
  iDiv.innerHTML = inner;
  return iDiv;
}

function buildPhotoLightBox(photo)  {
  var imgURL = 'https://farm' + photo.farm +'.staticflickr.com/' + photo.server + '/'+ photo.id + '_' + photo.secret + '.jpg';
  var title = photo.title;  
  document.getElementById('lightbox-image').innerHTML = '<img src="' + imgURL + '"/>' + '<div class="title">' + photo.title + '</div>';
 }