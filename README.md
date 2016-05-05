# js-going-native 👹
Hello, world! I'm building a lightbox photo library in native JavaScript using the Flickr API. No JQuery here. 

## Description 
So, why no JQuery? 😱 In this exercise I'm going under the hood of AJAX requests in raw JavaScript. No js libraries or frameworks here! This is a great opportunity to consider whether using JQuery is necessary in client-side js applications! 😎 Further, it has cemented my understanding of using raw javascript to make API queries. 

## Technologies Used
- Flickr API
- JavaScript in the raw!

## User Experience 
1. User arrives at a page and sees a 4x4 grid of photo images.  
1a. These image thumbnails are popualted via Flikr API.
2. User selects an image and sees it expand, lightbox-style, while other images dim in the background. 
3. User navigates through photo library (next/previous photos). Photos must display corresponding photo tile. 
4. User minimizes photo to return to thumbnail gallery. 

## Cross-Browser View
- This should run on latest verison of Chrome, Safari, Firefox, IE.

## A Note about Responsiveness
- CSS has been styled for two types of media formatting: screens of min-width : 720px and max-width: 720px. 

## Version II Wish List
- Integrate with Aframe or D3.js for unique front-end experience.
- API unit testing
- Tests in Selenium, Cucumber
- Cross-browser responsiveness 
- Allowing users to naviagte through images on multiple devices (nexus, iphone, ipad) while maintaining DOM integrity.

## Blogging 
- I plan to write about my experiences with this project on my blog: blog.holly-peck.com.