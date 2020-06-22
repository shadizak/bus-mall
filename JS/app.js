
'use strict';

 
var ctx = document.getElementById("myChart").getContext('2d');
var totalClicks = 0;  
var firstImg = document.getElementById('first');
var secondImg = document.getElementById('second');
var thirdImg = document.getElementById('third');
 
var lastShownImages = []; 

 var allProducts = [];
 function Product(name, imgPath) {
   this.name = name;
  this.imgPath = imgPath;
  this.views = 0;  
  this.votes = 0;  

  var cOne = Math.floor(Math.random() * 255);
  var cTwo = Math.floor(Math.random() * 255);
  var cThree = Math.floor(Math.random() * 255);

  this.bgColor = `rgba(${cOne}, ${cTwo}, ${cThree}, 0.2)`;
  allProducts.push(this);  
}
if (localStorage.productVotes) {  
  allProducts = JSON.parse(localStorage.getItem('productVotes')); 
 } else {
  new Product('bag', 'img/assets/bag.jpg');
new Product('banana', 'img/assets/banana.jpg');
new Product('bathroom', 'img/assets/bathroom.jpg');
new Product('boots', 'img/assets/boots.jpg');
new Product('breakfast', 'img/assets/breakfast.jpg');
new Product('bubblegum', 'img/assets/bubblegum.jpg');
new Product('chair', 'img/assets/chair.jpg');
new Product('cthulhu', 'img/assets/cthulhu.jpg');
new Product('dog-duck', 'img/assets/dog-duck.jpg');
new Product('dragon', 'img/assets/dragon.jpg');
new Product('pen', 'img/assets/pen.jpg');
new Product('pet-sweep', 'img/assets/pet-sweep.jpg');
new Product('scissors', 'img/assets/scissors.jpg');
new Product('shark', 'img/assets/shark.jpg');
new Product('sweep', 'img/assets/sweep.png');
new Product('tauntaun', 'img/assets/tauntaun.jpg');
new Product('unicorn', 'img/assets/unicorn.jpg');
new Product('usb', 'img/assets/usb.gif');
new Product('water-can', 'img/assets/water-can.jpg');
new Product('wine-glass', 'img/assets/wine-glass.jpg');
} 
function randomImage() {
  var firstRandom = Math.floor(Math.random() * allProducts.length);
  var secondRandom = Math.floor(Math.random() * allProducts.length);
  var thirdRandom = Math.floor(Math.random() * allProducts.length);
 
  while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom || lastShownImages.includes(firstRandom) || lastShownImages.includes(secondRandom) || lastShownImages.includes(thirdRandom)) {
    firstRandom = Math.floor(Math.random() * allProducts.length);
    secondRandom = Math.floor(Math.random() * allProducts.length);
    thirdRandom = Math.floor(Math.random() * allProducts.length);
  }
  
  lastShownImages[0] = firstRandom;
  lastShownImages[1] = secondRandom;
  lastShownImages[2] = thirdRandom;

  firstImg.src = allProducts[firstRandom].imgPath;
  secondImg.src = allProducts[secondRandom].imgPath;
  thirdImg.src = allProducts[thirdRandom].imgPath;

   firstImg.alt = allProducts[firstRandom].name;
  secondImg.alt = allProducts[secondRandom].name;
  thirdImg.alt = allProducts[thirdRandom].name;

   allProducts[firstRandom].views++;
  allProducts[secondRandom].views++;
  allProducts[thirdRandom].views++;

   totalClicks++;
   if (totalClicks === 25) {
    firstImg.removeEventListener('click', handleImageClick);
    secondImg.removeEventListener('click', handleImageClick);
    thirdImg.removeEventListener('click', handleImageClick);
    displayResults();  
    localStorage.setItem('productVotes', JSON.stringify(allProducts));  
  }

}
 function handleImageClick(event) {

  for (var i = 0; i < allProducts.length; i++) {
    if (event.target.alt === allProducts[i].name) {
      allProducts[i].votes++;
    }
  }
   randomImage();
}
randomImage();
 function displayResults() {
  var names = [];
  for (var i = 0; i < allProducts.length; i++) {
    names.push(allProducts[i].name);
  }

  var votes = [];
  for (var j = 0; j < allProducts.length; j++) {
    votes.push(allProducts[j].votes);
  }

  var colors = [];
  for (var k = 0; k < allProducts.length; k++) {
    colors.push(allProducts[k].bgColor);
  }

  var chartConfig = {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: colors,
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  return new Chart(ctx, chartConfig);
}
 firstImg.addEventListener('click', handleImageClick);
secondImg.addEventListener('click', handleImageClick);
thirdImg.addEventListener('click', handleImageClick);