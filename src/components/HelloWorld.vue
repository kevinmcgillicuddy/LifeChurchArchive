<template>
<div>
  <router-link :to="{name:'Login'}">Log In</router-link>
      <div class="container logged-in" style="margin-top: 40px;">
      <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="collapsible-header"><a :href="file.url.i"><i class="material-icons">filter_drama</i></a>{{ file.name }}
          <p>{{ file.path }}</p>
          <button v-on:click="send(file.gsurl,file.name,$event)">Transcribe</button></div>
          <div class="collapsible-body"><span>{{ file.name }}</span></div>
        </li>
      </ul>
    </div> 
</div>
</template>
<script>
import { storage } from '@/firebase/init.js'
import { functions } from '@/firebase/init.js'
import { db } from '@/firebase/init.js'
import M from 'materialize-css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: []
    }
  },
  methods:{

  },
   mounted(){  
      var CollapseElems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(CollapseElems)
    
    },
  created(){
      let guid = () => {
          let s4 = () => {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      }
    var folder = 'mp3'
    var storageRef = storage.ref()
    var listRef = storageRef.child(folder)
    listRef.listAll()
            .then(response => {
                let files = []  
                response.items.forEach(item => {

                    console.log(getText('5_6.mp3'))
                    //const text = await getText(item.name)
                    const id = {uid: guid()}
                    const url = item.getDownloadURL().then(url => {return url} )
                    const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${item.name}`
                    files.push({...item, name:item.name, url, gsurl, id:id.uid})
                    });
                    this.files = files;
                  })
            .catch(error => console.log(error));
  
  //create async function that 
  async function getText(docID) {
    db.db.collection('sermons').doc(docID).onSnapshot(doc=>{
       const res = doc
     })
    return res
// this will return a promise
}
  

  
  },
    methods:{
      send(file,name,event){
      event.target.disabled = true
      const transcribe = functions.httpsCallable('transcribe')
      transcribe({ file: file, name: name }).then(()=>{alert("File submitted") })
      }
    }
}
</script>


<style >

</style>
