<template>
<nav class="nav-extended header">
    <div class="nav-wrapper">
      <a href="https://lifechurchlancaster.org" class="brand-logo nb"><i class="material-icons"></i>Life Church Lancaster</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{name:'Login'}">Log In</router-link></li>
        <li v-if="user.loggedIn"><a @click="logout">Log Out</a></li>

  
      </ul>
    </div>
      <ul class="sidenav page-header-nav" id="mobile-demo">
        <li><router-link :to="{name:'Login'}">Log In</router-link></li>
 
    </ul>
  </nav>
</template>
<script>
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
       // map `this.user` to `this.$store.getters.user`
      ...mapGetters({
      user: "user"
    })
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