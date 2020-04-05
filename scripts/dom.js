var storageRef = storage.ref()
var listRef = storageRef.child('mp3/2020')
const list = document.querySelector('.list')
const accountDetails = document.querySelector('.account-details')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

// setup materialize components

document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

// listRef.listAll()
//   .then((response) => {
//     let html = ''
//     response.items.forEach(itemRef => {
//       var dlRef = storageRef.child(itemRef.fullPath)
//       dlRef.getDownloadURL()
//         .then(function (url) {
//           console.log(url)
//           const li =
//             `<li>
//               <div class="collapsible-header grey lighten-4">${itemRef.name}</div>
//               <div class="collapsible-body white"><img src="image/download-button.png" width="25" height="25" download="${url}"/>
//               <a href=${url}><img src="image/play-arrow.png" width="25" height="25" style="margin-left: 5em;"/></a>
//               <img src="image/menu-button.png" width="25" height="25" style="margin-left: 5em;"/>
//               </div>
//              </li>`
//           html += li
//           list.innerHTML = html;       })
//         .catch(function (error) { console.log(error) })
//     });
//   }).catch(error => console.log(error));


  // function download(url){
  //  console.log('inside')
  //   var xhr = new XMLHttpRequest();
  //   xhr.responseType = 'blob';
  //   xhr.onload = function(event) {
  //     var blob = xhr.response;
  //   };
  //   xhr.open('GET', url);
  //   xhr.send();
    
  // }


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
    //hide account info
    accountDetails.innerHTML = ''
    //toggle UI elements
    loggedInLinks.forEach(item => item.style.display = "none")
    loggedOutLinks.forEach(item => item.style.display = "block")
  }
}


