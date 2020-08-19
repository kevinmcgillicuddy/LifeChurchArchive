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
export default {
  name: 'App',
   components:{
    Footer,
    Header
  }
}
</script>

<style>
</style>
