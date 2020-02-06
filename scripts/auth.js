//listen for uath state changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user)
        setupUI(user)
    }
    else {
        setupGuides([])
        setupUI(user)
    }
})


const logoutButton = document.querySelector('#logout')
const loginForm = document.querySelector('#login-form')
const loginButton = document.querySelector('.login-button')
const guidesForm = document.querySelector('#create-form')

//logout users
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

//login user
loginButton.addEventListener('click', () => {
    auth.signInWithRedirect(provider)
    .catch(function (error) {
       console.log(error)
    });
})
