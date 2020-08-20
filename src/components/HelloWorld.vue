<template>
<div>
  <router-link :to="{name:'Login'}">Log In</router-link>
      <div class="container logged-in" style="margin-top: 40px;">
      <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="collapsible-header"><a :href="file.url.i"><i class="material-icons">filter_drama</i></a>{{ file.name }}
          <p>{{ file.path }}</p>
          <button v-on:click="send(file.gsurl,file.name,$event)" v-if="file.text">Transcribe</button></div>
          <div class="collapsible-body"><span>{{file.id}}{{ file.text }}</span></div>
        </li>
      </ul>
    </div> 
</div>
</template>
<script>
import { storage } from '@/firebase/init.js'
import { functions } from '@/firebase/init.js'
import { firestore } from '@/firebase/init.js'
import M from 'materialize-css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: [],
      string:'string'
    }
  },
  methods:{

  },
   mounted(){  
      var CollapseElems = document.querySelectorAll('.collapsible');
      M.Collapsible.init(CollapseElems)
      //  let guid = () => {
      //     let s4 = () => {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
      // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      // }

    var folder = 'mp3'
    var storageRef = storage.ref()
    var listRef = storageRef.child(folder)   

  async function buildFiles(){
      let sermons = await listRef.listAll()
      let files = []
      for (const sermon of sermons.items){
        const text = await getText(sermon.name)
        // const id = {uid: guid()}
        const url = await sermon.getDownloadURL()
        const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`
        files.push({...sermon, name:sermon.name, url, gsurl, text})  
    }

    return files
    }

  async function getText(docID) {
        var docRef = firestore.collection("sermons").doc(docID);
        let doc = await docRef.get()
        if (doc.exists){return await doc.data().text}}

buildFiles().then(res=>this.files = res)
    
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
