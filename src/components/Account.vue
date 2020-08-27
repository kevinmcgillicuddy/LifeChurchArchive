<template>
<div>
    <h3>{{user}}</h3>
    </div>
</template>
<script>
import M from "materialize-css";
import { mapGetters } from "vuex";
export default {
  Name: "Account",
  data() {
    return {};
  },
   computed: {
    ...mapGetters({
      user: "user",
    }),
  }
};
</script>
<style>

</style>
