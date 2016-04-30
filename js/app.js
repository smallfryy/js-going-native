// make API dance 

var apiURL = "https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=9e6435a5c19133a2125890534ed0ed98&per_page=10&format=json&nojsoncallback=1";

function goNative(url, callBack)
  var getFlickrRequest = new XMLHTTPRequest();
    getFlickrRequest.onreadystatechange = function(){
      if (getFlickrRequest.readyState === 4 && getFlickrRequest.status === 200) {
        var data = JSON.parse(getFlickrRequest.responseText);
        if (callBack) callBack(data);
      }
    }
  };
  getFlickrRequest.open('GET', url);
  getFlickrRequest.send();
}

goNative(apiURL, function(data)){
  console.log(data);
};