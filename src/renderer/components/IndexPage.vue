<template>
  <div id="wrapper">
    <no-titlebar></no-titlebar>
    <router-view></router-view>
  </div>
</template>

<script>
import NoTitlebar from "@/components/Titlebar.vue";
export default {
  name: "index-page",
  components: {
    NoTitlebar,
  },
  methods: {
    open(link) {},
  },
};
</script>

<style></style>
