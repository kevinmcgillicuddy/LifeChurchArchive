<template>
<div>
<nav class="nav-extended header">
    <div class="nav-wrapper">
      <img src="https://images.squarespace-cdn.com/content/v1/5b8959b796e76f42f164a8b4/1544566935575-UNOD1ACTMVIW5VGHNGD6/ke17ZwdGBToddI8pDm48kGwrK3btlI3EWQwJ6Y0kNmmoCXeSvxnTEQmG4uwOsdIceAoHiyRoc52GMN5_2H8Wp8yrVxZlvyGiJVRFXUmhbI-ctUEcr85o6auTtd2MWfNSpJS6KsTJ3kPRsKlQIsIu4A/faded+icon.png?format=100w" />
      <a href="https://lifechurchlancaster.org" class="brand-logo nb"><i class="material-icons"></i>Life Church Lancaster</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="!user.loggedIn"><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user.loggedIn"><a @click="logout">Log Out</a></li>
        <li>  <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a></li>
      </ul>
    </div>
      <ul class="sidenav page-header-nav" id="mobile-demo">
        <li v-if="!user.loggedIn"><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user.loggedIn"><a @click="logout">Log Out</a></li>
        <li>  <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a></li>
     </ul>
  </nav>

  <div id="modal1" class="modal">
    <div class="modal-content">
      <div>
           <input type="file" ref="input1" style="display: none">                
           <button>choose a photo</button>
           
         </div>
</div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div
    >
  </div>

  </div>
</template>
<script>
import M from 'materialize-css'
import { mapGetters } from "vuex";
import { auth } from '@/firebase/init.js'
export default {
    name: 'Header',
    data(){
        return{}
    },
    methods:{
        logout(){
            auth.signOut().then(()=>{
               this.$router.push({name:'/'}) 
            })
        }
    },
    computed:{
      ...mapGetters({    
      user: "user"
    })
    },
      mounted(){  
      M.AutoInit()
      }
}
</script>
<style>
body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  main {
    flex: 1 0 auto;
  }
  .header{
      background-color: #38525c;
  }
  .page-header-nav{
      background-color: #5d737e;
      padding-top: 20px;
      color: #fff;
  }
</style>