//listen for uath state changes
auth.onAuthStateChanged(user => {
    if (user) {
        setupUI(user)
    }
    else {
        setupUI(user)
    }
})


const logoutButton = document.querySelector('#logout')
const loginForm = document.querySelector('#login-form')

loginForm.addEventListener('submit', (e) => {
    const email = signupForm['login-email'].value;
    const password = signupForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((response) => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

    })
})
//logout users
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
})

const GoogleloginButton = document.querySelector('#login-form-google')
//login user
GoogleloginButton.addEventListener('click', () => {
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