<template>
  <div>
    <nav class="nav-extended header">
      <div class="nav-wrapper">
        <img
          src="../assets/logo.png"
        />
        <a href="https://lifechurchlancaster.org" class="brand-logo nb">
          <i class="material-icons"></i>Life Church Lancaster
        </a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="!user.loggedIn">
            <router-link :to="{name:'Login'}">Log In</router-link>
          </li>
          <li v-if="user.loggedIn">
            <a @click="logout">Log Out</a>
          </li>
          <li>
            <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
          </li>
        </ul>
      </div>
      <ul class="sidenav page-header-nav" id="mobile-demo">
        <li v-if="!user.loggedIn">
          <router-link :to="{name:'Login'}">Log In</router-link>
        </li>
        <li v-if="user.loggedIn">
          <a @click="logout">Log Out</a>
        </li>
        <li>
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        </li>
      </ul>
    </nav>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <div>
          <input type="file" @change="previewImage" />
        </div>
        <div>
          <p>
            Progress: {{uploadValue.toFixed()+"%"}}
            <progress
              id="progress"
              :value="uploadValue"
              max="100"
            ></progress>
          </p>

          <!-- <div class="progress">
            <div class="determinate" style={ width: uploadValue+}> <progress
              id="progress"
              max="100"
            ></progress></div>
          </div>-->
        </div>
      </div>
      <div class="modal-footer">
        <button @click="onUpload" class="btn waves-effect waves-light">Upload</button>
        <button class="btn waves-effect waves-light modal-close">Close</button>
      </div>
    </div>
  </div>
</template>
<script>
import M from "materialize-css";
import { mapGetters } from "vuex";
import { auth } from "@/firebase/init.js";
import { storage } from "@/firebase/init.js";
export default {
  name: "Header",
  data() {
    return {
      mp3Data: null,
      // mp3: null,
      uploadValue: 0,
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push({ name: "/" });
      });
    },
    previewImage(event) {
      this.uploadValue = 0;
      // this.mp3 = null;
      this.mp3Data = event.target.files[0];
    },
    onUpload() {
      function guid() {
        let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        };
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4();
      }

      var metadata = {
        customMetadata: {
          uuid: guid(),
        },
      };

      this.mp3 = null;
      const storageRef = storage
        .ref(`mp3/${this.mp3Data.name}`)
        .put(this.mp3Data, metadata);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        }
      );
      // ()=>{this.uploadValue=100;
      //   storageRef.snapshot.ref.getDownloadURL().then((url)=>{
      //     this.picture =url;
      //   });
      // }
      // );
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    M.AutoInit();
  },
};
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
.header {
  background-color: #38525c;
}
.page-header-nav {
  background-color: #5d737e;
  padding-top: 20px;
  color: #fff;
}
</style>