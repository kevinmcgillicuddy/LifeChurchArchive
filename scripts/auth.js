const loginForm = document.querySelector('#login-form')
const logoutButton = document.querySelector('#logout')
const GoogleloginButton = document.querySelector('#login-form-google')
const signupForm = document.querySelector('#signup-form')
//listen for uath state changes
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user)
        console.log('state')
    }
    else {
        setupUI(user)
        console.log('state failed')
    }
})

loginForm.addEventListener('submit', (e) => {
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((response) => {
        //console.log('response', response)
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
    .catch(err => console.log(err))
})

//logout users
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

//login user
GoogleloginButton.addEventListener('click', () => {
    auth.signInWithRedirect(provider)
        .catch(function (error) {
            console.log(error)
        });
})

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