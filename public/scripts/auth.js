const loginForm = document.querySelector('#login-form')
const logoutButton = document.querySelector('#logout')
const GoogleloginButton = document.querySelector('.login-form-google')
const signupForm = document.querySelector('#signup-form')
//listen for uath state changes
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        setupUI(user)
    }
    else {
        setupUI(user)
    }
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        })
        .catch((error)=>{
            alert(error)
            console.error(error)
        })
})

//logout users
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut()
})

//login user google
GoogleloginButton.addEventListener('click', () => {
    firebase.auth().signInWithRedirect(provider)
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
    firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
        return firebase.db.collection('users').doc(response.user.uid)
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})