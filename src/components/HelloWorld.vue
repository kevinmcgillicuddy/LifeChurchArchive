<template>
<div>
  <router-link :to="{name:'Login'}">Log In</router-link>
      <div class="container logged-in" style="margin-top: 40px;">
      <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="collapsible-header"><a :href="file.url.i"><i class="material-icons">filter_drama</i></a>{{ file.name }}</div>
          <div class="collapsible-body"><span>{{ file.name }}</span></div>
        </li>
      </ul>
    </div> 
</div>
</template>
<script>
import { storage } from '@/firebase/init.js'
import M from 'materialize-css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: []
    }
  },
   mounted(){  
      var CollapseElems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(CollapseElems)
    
    },
  created(){
    var folder = 'mp3'
    var storageRef = storage.ref()
    var listRef = storageRef.child(folder)
     listRef.listAll()
            .then(response => {
                let files = []  
                response.items.forEach(item => {
                     const url = item.getDownloadURL().then(url => {return url} )
                     const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${item.name}`
                     files.push({...item, name:item.name, url, gsurl})
                    });
                    this.files = files;
                  })
            .catch(error => console.log(error));
  }
}
</script>


<style >

</style>
