// implement infinite scroll functionality,as we scroll to bottom of the page another network request is made but it happens before we reach to the bottom
// images are photos fetched from pixabay api and we're tracking the moment all the images are loaded in order to dynamically hide our loading animation
// pixabay api- for free images
const imageContainer= document.getElementById('image-container');
// when we load totalImages we can set a ready boolean to be true again 
// when page load for the first time we can set ready to be false 
let ready= false;
let imagesLoaded=0;
let totalImages=0; 
const loader= document.getElementById('loader');
// let- because the value within our photos array  is going to change every time we make a request 
let photosArray=[];
const apiKey='36139512-239e62521ca8d2f89793817c6';
const perPage = 100; 
// const category="fashion";   
const imageType = "photo";
const apiUrl=`https://pixabay.com/api/?key=${apiKey}&q=&image_type=${imageType}&per_page=${perPage}`;

// check if all images were Loaded
function imageLoaded(){
    // function is called for each individual image 
    // console.log('image Loaded');
    imagesLoaded++;
    // console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready= true;
        // true-hide loader 
        loader.hidden=true; 
        // console.log('ready =', ready);
    }
}
// we should follow a dry- don't repeat yourself property of lld , create a helper function to set attributes on dom elements
function setAtrributes(element,attributes){
    // for in loop to loop through for each of the attributes you want to set,assign key constant  ie href, target alt ,title in attributes  which is an object containing both key and the value we actually want to setand pass in the elements that will be our item or image and run the setattribute method and pass the key and attribute with the index of that specific key
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}







// forEach method to run a function for every element within the array 
// we will use that to create our each html element for each of the object, properties need to be returned in each of the objects are  <a href=""> <img src=" " alt=" " title=" "> </a>, anchor element wrapping an image element
// for each item in the array we're going to run through the loop every single time and create an item,img and put img in item and finally item in our imagecontainer
// create elements for links and Photos, add to dom 
function displayPhotos(photos){
    imagesLoaded=0;
    totalImages=photos.length;
    // console.log('total images',totalImages);
    // run function for each object in photosArray
    // each object will be assigned to our photo variable
    photos.forEach((photo) => {
       
        // create <a> to link to pixabay
        const item= document.createElement('a');
        // item.setAttribute('href',photo.pageURL);
        // item.setAttribute('target','_blank');
        setAtrributes(item,{
            href:photo.pageURL,
            target:photo.pageURL,
        });
        // create <img> for photo 
        const img= document.createElement('img');
        // img.setAttribute('src',photo.webformatURL);
        // img.setAttribute('alt',photo.tags);
        // img.setAttribute('title',photo.tags);
        setAtrributes(img,{
            src:photo.webformatURL,
            alt:photo.tags,
            title:photo.tags,
        });
        // to be able to know exactly when all of our images have finised loading after each call
        // event listener,check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside imageContainer Element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// get photos from pixabay api 
async function getPhotos() {
    try{
        const response=await fetch(apiUrl);
        // const photosArray=await response.json();
        // console.log(photosArray);
        photosArray=await response.json();
        // console.log(photosArray);
        displayPhotos(photosArray.hits);
    }
    catch(error){
console.log(error);
    }
}

// check to see if scrolling near bottom of page, load more photos 
// window is parent of document and grandparent of our body 
window.addEventListener('scroll',()=>{
    // console.log('scrolled');
    // window.innerHeight remains same untill the browser window is resized, total height of browser window
    // window.scrollY will increase with each log,distance from top of page user has scrolled
    // document.body.offsetHeight-1000px(can be any value) will be consistent because once the page has loaded we have the full height of all the images
// 1000px because most window inner heights are less tha a 1000 px that means when user scrolls to this pint that is when we will trigger our event and load more photos 
    // document.body.offsetHeight: height of everything in the body including what is not within view
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
getPhotos();
// console.log('load more');
    }
});
// on load 
getPhotos();


 