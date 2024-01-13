<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themer from "@/util/Themer";
export default {
  name: "ntd",
  computed: {
    theme() {
      return this.$store.getters["View/theme"];
    },
  },
  created() {
    if (!this.theme || this.theme === "pomotroid") return;
    themer.apply(this.theme);
  },
};
</script>

<style>
/* CSS */
</style>
