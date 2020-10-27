$(document).ready(() => {

//Init Function
fetchUsers();

//Users Objects Array
let users = [];

//Btn event listeners
$('#addUser').on('click', e => {
  $('.total').empty();
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      createUsers(data);
    }
  });

});

//Map Method
$('#dblMoney').on('click', event => {
$('.total').empty();
let arr = users.map((elem, index, array) => {
return elem.fortune = parseInt(elem.fortune) * 2;
});
doubleMoney(users);
console.log(users);
})

//Show richest users (sort method)
$('#richest').on('click', e => {
$('.total').empty();
//Clearing Parent Element
$('.parent').empty();
let fortunes = users.sort((a, b) => b.fortune - a.fortune); //Sorting Array by richest

fortunes.forEach(elem => {
  $('.parent').append(`<div class="d-flex flex-row justify-content-between">
      <h3 class="font-weight-bold mr-3">${elem.firstname + ' ' +elem.lastname}</h3>
      <h4 id="money">${moneyFormat(elem.fortune)}</h4>
    </div>`);
});


  console.log(fortunes);
})

//Show only millionaires
$('#millionaires').on('click', e => {
$('.total').empty();
$('.parent').empty();
users.forEach((elem, index) => {
if(elem.fortune.toString().length >= 7) {
  $('.parent').append(`<div class="d-flex flex-row justify-content-between">
      <h3 class="font-weight-bold mr-3">${elem.firstname + ' ' + elem.lastname}</h3>
      <h4 id="money">${moneyFormat(elem.fortune)}</h4>
    </div>`);
} else {
  $('.total').empty();
   users.splice(index, 1);
   console.log(users);

}
})
});


//Calculate People's entire wealth
$('#entireWealth').on('click', e => {

let sum = 0;
users.forEach(elem => {
if(users.length == 1) {
sum = elem.fortune;
} if(users.length >= 2) {
sum += elem.fortune;
}
});

$('.total').append(`<div class="d-flex flex-row justify-content-between bg-white mt-3 p-2" id="total">
    <h3 class="font-weight-bold mr-3">Total Wealth : </h3>
    <h4 id="money">${moneyFormat(sum)}</h4>
  </div>`);

})


//Displaying New Array into DOM
function doubleMoney(arr) {
let money = document.querySelectorAll('#money');
for(let i = 0; i < money.length; i++) {
money[i].innerHTML = moneyFormat(users[i].fortune);
}
}


//Get users from API
async function fetchUsers() {
let users = await fetch(`https://randomuser.me/api/?results=${getRandomArbitrary(1, 4)}`);
let user = await users.json();
createUsers(user);
}

//Random Function
function getRandomArbitrary(min, max) { //Number in range from min to max
  return Math.floor(Math.random() * (max - min) + min); //Number from 0 to 1 with commas * 9 + 1 = 10
}

// Get RAndom Users from API
function createUsers(obj) {
obj.results.forEach(user => {
  let random = getRandomArbitrary(25000, 999999);
    users.push({firstname : user.name.first, lastname : user.name.last, fortune : random});
    $('.parent').append(`<div class="d-flex flex-row justify-content-between">
        <h3 class="font-weight-bold mr-3">${user.name.first + ' ' +user.name.last}</h3>
        <h4 id="money">${moneyFormat(random)}</h4>
      </div>`);
});
console.log(users);
}

//Make number look like money
function moneyFormat(price) {
return (price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}



















































})
