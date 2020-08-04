<template>
       <div class="login container">
        <form @submit.prevent="login" class="card-panel">
            <h2 class="center blue-text">Login</h2>
             <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email">
            </div>
             <div class="field">
                <label for="password">password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <p v-if="feedback" class="red-text center">{{feedback}}</p>
            <div class="field">
                <button class="btn blue darken-3">Login</button>
            </div>
        </form>
    <!-- <div clas="divider"></div>
    
        <a class="waves-effect waves-light btn" @click="gLogin"><i class="material-icons left">account_circle</i>Sign in with Google</a> -->
        
    </div>
</template>
<script>
import { auth } from '@/firebase/init.js'
export default {
 name: 'Login',
  data () {
    return {  
        feedback:null,
        password:null,
        email:null
    }
  },
  methods:{
      login(){
          if(this.email && this.password){
              auth.signInWithEmailAndPassword(this.email, this.password)
                .then(()=>{
                    this.$router.push({name:'HelloWorld'})
                    this.feedback = null
            }).catch(err=> {this.feedback =  err.message})
          }
          else{this.feedback = "You must enter a email and password"}
      },
    //  gLogin(){
    //      var provider = new firebaseApp.auth.GoogleAuthProvider();
    //      firebaseApp.auth().signInWithPopup(provider).then((result) => {
    //           var token = result.credential.accessToken;
    //           var user = result.user;
    //         }).catch(err=> {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             var email = error.email;
    //             var credential = error.credential;}); }
  }
  }
</script>
<style>
.login{
    max-width:400px;
    margin-top:60px;
}
.login h2{
    font-size:2.4em;
}
.login .field{
    margin-bottom:16px;
}
</style>