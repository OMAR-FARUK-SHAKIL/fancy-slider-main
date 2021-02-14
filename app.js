const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
//spinner fuction
const toggleSpinner = () => {
  const spin = document.getElementById('spinner');
  spin.classList.toggle('d-none');
  const imageContainer = document.getElementById('image-container');
  imageContainer.classList.toggle('d-none');
}
// selected image 
let sliders = [];

var input = document.getElementById("search");
input.addEventListener("keyup", function (event) {
  //if (event.keyCode === 13) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
});

const KEY = '15674931-a9d714b6e9d654524df198e00&q';
// show images 
const showImages = (images) => {
  if(images.length == 0 ){
    errorHandler(true);
  }
  else{ errorHandler(false);}
 
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  toggleSpinner();
}

const getImages = (query) => {
  //console.log(query);
  toggleSpinner();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data =>  showImages(data.hits))
      // console.log(data))
      // showImages(data.hits))
    .catch(error => console.log(error))
      // errorHandler(error))
    // console.log(error))
}
//errorHandler
const errorHandler = (value) => {
  let ero = document.getElementById('error-message');
  if(value == true){ero.classList.remove('d-none');}
  if(value==false){
    ero.classList.add('d-none');
  }
  
  // ero.style.display='block';
}
let slideIndex = 0;
const selectItem = (event, img) => {
  //console.log('event',event,'img',img);
  let element = event.target;
  element.classList.add('added');

  let item = sliders.indexOf(img);
  //console.log('item=',item,'ele=',element)
  //console.log('slider=',sliders);
  if (item === -1) {
    sliders.push(img);
  } else {
    element.classList.remove('added');
    sliders.pop();
    console.log('after item=',item);
    // alert('Hey, Already added !')
  }
}
var timer
const createSlider = () => {
  //// check slider image length
  // if (sliders.length < 2) {
  //   alert('Select at least 2 image.')
  //   return;
  // }
  //// crate slider previous next area
  //
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const durationInput = document.getElementById('duration').value;
  // Math.abs(durationInput);
   const duration = Math.abs(durationInput) || 1000;
  //const duration = document.getElementById('duration');
  //console.log(duration.value);
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})
