<template>
  <div id="wrapper">
    <no-titlebar></no-titlebar>
    <!-- <NotionRenderer :blockMap="blockMap" fullPage /> -->
    <!-- <vue-notion-render :unofficial="false" :data="data" /> -->
    <div class="main">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NoTitlebar from "@/components/Titlebar.vue";
import {GetToDayTodo,BuildPageId} from "../util/request.js";
// import Setting from "/src/setting";

export default {
  name: "index-page",
  components: {
    NoTitlebar
  },
  data: () => ({ blockMap: null,data:[ ] }),
  async created() {
    },
  async mounted() {
    
  },
  methods: {
  },
};
</script>

<style>
#wrapper{
  height: 100%;
}
.main{
  height: calc(100% - 50px);
}
</style>
