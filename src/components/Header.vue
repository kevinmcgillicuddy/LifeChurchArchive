<template>
  <div>
    <nav class="nav-extended header">
      <div class="nav-wrapper">
        <a href="https://lifechurchlancaster.org" class="brand-logo nb">
          <i class="material-icons"></i>Life Church Lancaster Archive
        </a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-if="!user.loggedIn">
            <router-link :to="{name:'Login'}">Log In</router-link>
          </li>
          <li v-if="user.loggedIn">
            <a class="waves-effect waves-light brand-color-dark btn" @click="logout">Log Out</a>
          </li>
          <li>
            <a class="waves-effect waves-light btn modal-trigger white" href="#modal1">
              <i class="material-icons right text">add</i>
              <span class="text">Upload</span>
            </a>
          </li>
        </ul>
      </div>
      <ul class="sidenav page-header-nav" id="mobile-demo">
        <li v-if="!user.loggedIn">
          <router-link :to="{name:'Login'}">Log In</router-link>
        </li>
        <li v-if="user.loggedIn">
          <a class="waves-effect waves-light btn" @click="logout">Log Out</a>
        </li>
        <li>
          <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Upload</a>
        </li>
      </ul>
    </nav>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <div>
          <input type="file" @change="previewFile" />
        </div>
        <div>
          <p></p>
          <form action="#">
            <p>
              <label>
                <input name="group1" value="2020" type="radio" v-model="yearPicked"  />
                <span>2020</span>
              </label>
            </p>
            <p>
              <label>
                <input name="group1"  value="2019" type="radio"  v-model="yearPicked"/>
                <span>2019</span>
              </label>
            </p>
            <p>
              <label>
                <input class="with-gap" name="group1" value="2018" type="radio" v-model="yearPicked" />
                <span>2018</span>
              </label>
            </p>
            <p>
              <label>
                <input name="group1" value="2017" type="radio" v-model="yearPicked"/>
                <span>2017</span>
              </label>
            </p>
          </form>
          <div v-if="mp3Data" class="progress">
            <div class="determinate" v-bind:style="{ width: uploadValue + '%'}"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span v-if="feedback" style="color: red">{{feedback}}</span>
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
      uploadValue: 0,
      feedback: "",
      yearPicked: null
    };
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.push({ name: "/" });
      });
    },
    previewFile(event) {
      this.uploadValue = 0;
      let type = "audio";
      if (!event.target.files[0].type.includes(type)) {
        this.feedback = "Please upload an audio file and try again";
      } else {
        this.mp3Data = event.target.files[0];
      }
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
      if (!this.mp3Data) {
        this.feedback = "Please select a file and try again";
        } else {
        this.feedback = "";
        const storageRef = storage
          .ref(`mp3/${this.yearPicked}/${this.mp3Data.name}`)
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
      }
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
.text {
  color: black;
}
.brand-color-dark{

  background-color: #38525c;


}
 .brand-color-dark:hover {background-color: white);}
</style>