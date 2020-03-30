const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details')
const adminItems = document.querySelectorAll('.admin')
const list = document.querySelector('.list')
var storageRef = storage.ref();
var listRef = storageRef.child('mp3/2020');


// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});


listRef.listAll()
  .then((response) => {
    //console.log(response)
    let html = ''
    response.items.forEach(itemRef => {
      var dlRef = storageRef.child(itemRef.fullPath)
      dlRef.getDownloadURL()
        .then(function (url) {
          const li =
          `<li>
              <div class="collapsible-header grey lighten-4">${itemRef.name}</div>
              <div class="collapsible-body white"><img src="image/dl.jpg" href=${url} width="25" height="25"/></div>
            </li>`
  
        html += li
        list.innerHTML = html;


        })
        .catch(function (error) { console.log(error) })



     
    });
  }).catch(error => console.log(error));


//setup nav links based on user log in / log out
const setupUI = (user) => {
  if (user) {
    const html = `<div><img src="${user.photoURL}" style="border-radius:50%; height:100px" />
      <p><div>Logged in as: <b>${user.email}</b></div>`
    accountDetails.innerHTML = html
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = "block")
    loggedOutLinks.forEach(item => item.style.display = "none")


  }
  else {
    adminItems.forEach(item => item.style.display = 'none')
    //hide account info
    accountDetails.innerHTML = ''
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = "none")
    loggedOutLinks.forEach(item => item.style.display = "block")
  }
}