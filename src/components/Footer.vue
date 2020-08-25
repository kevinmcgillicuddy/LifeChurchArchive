<template>
     <footer class="page-footer-main">
          <div class="container footermain">
            <div class="row footermain">
              <div class="col l6 s12">
                <h5 class="white-text">Life Church Lancaster</h5>
                <!-- <p class="grey-text text-lighten-4"><img src="https://images.squarespace-cdn.com/content/v1/5b8959b796e76f42f164a8b4/1544566935575-UNOD1ACTMVIW5VGHNGD6/ke17ZwdGBToddI8pDm48kGwrK3btlI3EWQwJ6Y0kNmmoCXeSvxnTEQmG4uwOsdIceAoHiyRoc52GMN5_2H8Wp8yrVxZlvyGiJVRFXUmhbI-ctUEcr85o6auTtd2MWfNSpJS6KsTJ3kPRsKlQIsIu4A/faded+icon.png?format=100w" /></p> -->
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="white-text">Links</h5>
                 <ul>
                  <li><a class="grey-text text-lighten-3" href="https://lifechurchlancaster.org">Life Church</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://lifechurchlancaster.org/sermons">Sermons</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://lifechurchlancaster.org/app">The App</a></li>
                  <li><a class="grey-text text-lighten-3" href="https://lifechurchlancaster.org/contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="container row footer">
                <div class="col s6"><p>Sundays 9:00am and 10:45am</p><p>700 Brentwood Drive. Lititz, PA 17543</p></div>
                <div class="col s6"><p>(717) 723-8194</p><p>admin@lifechurchlancaster.org </p></div>
     
            </div>
          </div>
        </footer>
</template>
<script>
export default {
    Name:'Footer',
    data(){
        return{
      
        }
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
  .footer{
      background-color: #38525c;
  }
  .page-footer-main{
      background-color: #5d737e;
      padding-top: 20px;
      color: #fff;
  }
</style>
