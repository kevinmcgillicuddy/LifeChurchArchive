<template>
  <div>
    <div class="container logged-in" style="margin-top: 40px;">
        <!-- Dropdown Trigger -->
  <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

  <!-- Dropdown Structure -->
  <ul id='dropdown1' class='dropdown-content'>
    <li><a href="#" v-on:click="Start('2020')">2020</a></li>
    <li><a href="#" v-on:click="Start('2019')">2019</a></li>
   </ul>
        
  <!-- Dropdown Structure -->
      <ul class="collapsible z-depth-0 list" style="border: none;">
        <li v-for="(file,index) in files" :key="index">
          <div class="row">
            <div class="collapsible-header flow-text">
              <div class="col s10">
                <div>
                  <a :href="file.url.i">
                    <i class="material-icons">music_note</i>
                  </a>
                  {{ file.name }}
                </div>
              </div>
              <div class="col s2">
                <div v-if="!file.text" class="info">
                  <button class="btn-small white" v-on:click="send(file.gsurl,file.name,$event)">
                    <span class="text">Transcribe</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="collapsible-body flow-text">
            <span>{{ file.text }}</span>
              <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
          </div>
        </li>
      </ul>
    </div>
    <div></div>
  </div>
</template>
<script>
import { storage } from "@/firebase/init.js";
import { functions } from "@/firebase/init.js";
import { firestore } from "@/firebase/init.js";
import { mapGetters } from "vuex";
import M from "materialize-css";
export default {
  name: "HelloWorld",
  data() {
    return {
      files: [],
      string: "string",
      upFiles: []
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    M.AutoInit();
  },
  methods: {
    send(file, name, event) {
      event.target.disabled = true;
      const transcribe = functions.httpsCallable("transcribe");
      transcribe({ file: file, name: name }).then(() => {
        alert("File submitted");
      });
    },
    //new method here
    Start(year){
     
    var folder = `/mp3/${year}`;
    var storageRef = storage.ref();
    var listRef = storageRef.child(folder);
    async function getFiles() {
      let sermons = await listRef.listAll();
      let files = [];
      for (const sermon of sermons.items) {
        const md = await getMetadata(sermon);
        const text = await getText(sermon.name);
        const url = await sermon.getDownloadURL();
        const gsurl = `gs://lcarchivewebsite.appspot.com/${folder}/${sermon.name}`;
        files.push({
          ...sermon,
          name: sermon.name,
          url,
          gsurl,
          text,
          uuid: md.customMetadata.uuid,
        });
      }
      return files;
    }

    async function getText(docID) {
      var docRef = firestore.collection("sermons").doc(docID);
      let doc = await docRef.get();
      if (doc.exists) {
        return await doc.data().text;
      }
    }
   
    async function getMetadata(ref) {
       //ref should be sermon
      return ref.getMetadata();
    }

    getFiles().then((res) => (this.files = res));

    }
  }
};
</script>


<style >
.text {
  color: black;
}
</style>
