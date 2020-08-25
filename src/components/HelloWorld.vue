<template>
<div>
  <div class="container logged-in" style="margin-top: 40px;">
       <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="row">
            <div class="collapsible-header flow-text ">
                <div class="col s10">
                    <div>
                        <a :href="file.url.i"><i class="material-icons">music_note</i></a>{{ file.name }}
                    </div>
                </div>
                <div class="col s2 ">
                    <div v-if="!file.text" class="info">
                      <button class="btn-small white" v-on:click="send(file.gsurl,file.name,$event)"><span class="text">Transcribe</span></button>
                    </div>
                </div>        
            </div>
            </div>
          <div class="collapsible-body flow-text"><span>{{ file.text }}</span></div>
        </li>
      </ul>
    </div> 
    <div>

</div>

</div>
</template>
<script>
import { storage } from '@/firebase/init.js'
import { functions } from '@/firebase/init.js'
import { firestore } from '@/firebase/init.js'
import { mapGetters } from "vuex"
import M from 'materialize-css'
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: [],
      string:'string',
      upFiles:[]
    }
  },
   computed:{
      ...mapGetters({
      user: "user"
    })
    },
   mounted(){  
      M.AutoInit()
      //  let guid = () => {
      //     let s4 = () => {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
      // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      // }
              // const id = {uid: guid()}

    var folder = 'mp3'
    var storageRef = storage.ref()
    var listRef = storageRef.child(folder)   

  async function getFiles(){
      let sermons = await listRef.listAll()
      let files = []
      for (const sermon of sermons.items){
        const text = await getText(sermon.name)
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

getFiles().then(res=>this.files = res)
    
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
.text{
  color: black;
}
</style>
