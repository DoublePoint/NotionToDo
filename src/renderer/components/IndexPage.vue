<template>
  <div id="wrapper">
    <no-titlebar></no-titlebar>
    <router-view></router-view>
  </div>
</template>

<script>
import NoTitlebar from "@/components/Titlebar.vue";
import notion from "../util/server.js";
import Setting from "/src/setting";
export default {
  name: "index-page",
  components: {
    NoTitlebar,
  },
  mounted() {
    this.testNotion();
  },
  methods: {
    open(link) {},
    async testNotion() {
      let header = {
        "Notion-Version": "2022-06-28",
        "Authorization": `Bearer ${Setting.NOTION_KEY}`,
        // headphones: { "Access-Control-Allow-Origin": "*" },
      };
      // this.$http.defaults.headers.common['Authorization'] = `Bearer ${Setting.NOTION_KEY}`;
      // this.$http.defaults.headers.common['Notion-Version'] = `2022-06-28`;
      let url = `https://api.notion.com/v1/pages/${Setting.NOTION_PAGE_ID}`;
      this.$http
        .get(url, {},header)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
