const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')
const accountDetails = document.querySelector('.account-details')
const adminItems = document.querySelectorAll('.admin')

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});

const guidesList = document.querySelector('.guides')

//setup guides and display the,m
const setupGuides = (data) => {
  if (data.length) {
    let html = ''
    data.forEach(element => {
      const guide = element.data();
      const li =
        `<li>
    <div class="collapsible-header grey lighten-4">${guide.title}</div>
    <div class="collapsible-body white">${guide.content}</div>
        </li>`
      html += li
    });
    guidesList.innerHTML = html;
  }
  else {
    guidesList.innerHTML = '<h5 class="center-align">Login to view old messages</h5>'
  }
}

//setup nav links based on user log in / log out
const setupUI = (user) => {
  if (user) {
    const html = `<div><img src="https://lh3.googleusercontent.com/a-/AAuE7mC7ndJVEMKK_TCmMrMIkqYPXxgwwFNiXQ3tX2kajA" style="border-radius:50%; height:100px" />
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