<template>
<div>
  <router-link :to="{name:'Login'}">Log In</router-link>
      <div class="container logged-in" style="margin-top: 40px;">
      <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="collapsible-header"><a :href="file.url.i"><i class="material-icons">filter_drama</i></a>{{ file.name }}
          <p>{{ file.path }}</p>
          <button v-on:click="send(file.gsurl,file.name,$event)">Transcribe</button></div>
          <div class="collapsible-body"><span>The text is here:
            {{ file.text }}</span></div>
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
                    
                    const text = getText(item.name).then(text=>{return text})
                    const id = {uid: guid()}
                    const url = item.getDownloadURL().then(url => {return url} )
                    const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${item.name}`
                    files.push({...item, name:item.name, url, gsurl, id:id.uid, text})
                    
                    });
                    this.files = files;
                  })
            .catch(error => console.log(error));
  
  
  function getText(docID) {
        var docRef = firestore.collection("sermons").doc(docID);
            docRef.get().then(doc=> {
                if (doc.exists) {        
                  return doc.data().text
                } else {console.log("No such document!")}
             }).catch(err => {
                console.log("Error getting document:", err);
            });
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
