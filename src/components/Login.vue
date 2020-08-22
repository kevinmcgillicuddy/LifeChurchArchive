<template>
<div class="login container">
<div class="row">
                 <div class="col s6">
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
                    <div class="field button">
                        <button class="btn blue darken-3">Login</button>
                    </div>
                     </form>
                </div>
                  <div class="col s6">
                        <div class="card-panel">
                            <h2 class="center blue-text">Sign in with Google</h2>
                            
                            <p v-if="feedback" class="red-text center">{{feedback}}</p>
                            <div class="button">
                               <button v-on:click="gLogin" class="btn black darken-3">Login<i class="material-icons left">cloud</i></button>
                            </div>
                            </div>  
                  
                  
                  </div>
</div>
           
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
     gLogin(){
         var provider = new auth.GoogleAuthProvider();
         auth.signInWithPopup(provider).then((result) => {
              var token = result.credential.accessToken;
              var user = result.user;
            }).catch(err=> {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;}); }
  }
  }
</script>
<style>
.login{
    max-width:700px;
    margin-top:60px;
}
.login h2{
    font-size:2.4em;
}
.login .field{
    margin-bottom:16px;
}
.button{
    justify-content: center;
    display: flex;
    color: white;
 
}
</style>