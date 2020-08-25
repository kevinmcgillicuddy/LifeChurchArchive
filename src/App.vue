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
import Upload from '@/components/Upload'
export default {
  name: 'App',
   components:{
    Footer,
    Header,
    Login,
    Upload
  }
}
</script>

<style>
</style>
