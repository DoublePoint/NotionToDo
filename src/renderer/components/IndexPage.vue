<template>
  <div id="wrapper">
    <no-titlebar></no-titlebar>
    <!-- <NotionRenderer :blockMap="blockMap" fullPage /> -->
    <!-- <vue-notion-render :unofficial="false" :data="data" /> -->
    <keep-alive>
      <div class="main">
        <router-view></router-view>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import NoTitlebar from "@/components/Titlebar.vue";
import {GetToDayTodo} from "../util/request.js";
import Setting from "/src/setting";

export default {
  name: "index-page",
  components: {
    NoTitlebar
  },
  data: () => ({ blockMap: null,data:[ ] }),
  async created() {
        // Retrieve block children and pass the results array to data
        // https://developers.notion.com/reference/get-block-children
        const data = await GetToDayTodo(Setting.NOTION_PAGE_ID)
        console.log(data.data.results);
        this.data = data.data.results
    },
  async mounted() {
    this.testNotion();
    // this.blockMap = await getPageBlocks("8c1ab01960b049f6a282dda64a94afc7");
    // console.log(this.blockMap);
    
  },
  methods: {
    open(link) {},
    async testNotion() {
      let header = {
        // "Notion-Version": "2022-06-28",
        // "Authorization": `Bearer ${Setting.NOTION_KEY}`,
        // headphones: { "Access-Control-Allow-Origin": "*" },
      };
      // this.$http.defaults.headers.common['Authorization'] = `Bearer ${Setting.NOTION_KEY}`;
      // this.$http.defaults.headers.common['Notion-Version'] = `2022-06-28`;
      // let url = `api/v1/pages/${Setting.NOTION_PAGE_ID}`;
      // let ll = await this.$http.get(url, {});
      // console.log(GetPageChildren);
      // let ll = await GetToDayTodo(Setting.NOTION_PAGE_ID)

      // console.log(ll);
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err));
    },
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
