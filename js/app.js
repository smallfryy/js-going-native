var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=13b1d783bf00e8dcbd3c45f47097c796&tags=tarot&per_page=24&format=json&nojsoncallback=1";
var photoArray = [];
var currentPhotoIndex = 0;


// Asynch Call 
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
          } else {error: "there was a problem"};
      };
  httpRequest.open('GET', url);
  httpRequest.send(); // asynch request sent to server 
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
  document.getElementById("lightbox").style.visibility = "hidden";
};

function showLightBox(url) {
  var photo = photoArray[currentPhotoIndex];
  document.getElementById("lightbox").style.visibility = "visible";
};


function navigateRight(data) {
  var photo = photoArray[currentPhotoIndex];
  if (currentPhotoIndex < photoArray.length) {
    currentPhotoIndex += 1;
    buildPhotoLightBox(photo);
  }
}

function navigateLeft(data){
  var photo = photoArray[currentPhotoIndex];  
  if (currentPhotoIndex > 0){ 
    currentPhotoIndex -= 1;
    buildPhotoLightBox(photo);
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
   document.getElementById('lightbox-content').innerHTML = '<img src="' + imgURL + '"/>' + '<div class="title">' + title + '</div>';
 }

