//listen for uath state changes
auth.onAuthStateChanged(user => {
    if (user) {
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


const signupForm = document.querySelector('#signup-form')
//signup user
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then((response) => {
        return db.collection('users').doc(response.user.uid)

    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})