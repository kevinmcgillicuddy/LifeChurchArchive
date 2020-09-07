<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/footer'
import Header from '@/components/Header'
import Login from '@/components/Login'
export default {
  name: 'App',
   components:{
    Footer,
    Header,
    Login
  }
}
</script>

<style>
</style>
