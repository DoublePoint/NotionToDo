<template>
  <div id="wrapper">
    <no-titlebar></no-titlebar>
    <!-- <NotionRenderer :blockMap="blockMap" fullPage /> -->
    <!-- <vue-notion-render :unofficial="false" :data="data" /> -->
    <vue-notion-render :unofficial="false" :data="data" />
    123
    <router-view></router-view>
  </div>
</template>

<script>
import NoTitlebar from "@/components/Titlebar.vue";
import {GetToDayTodo} from "../util/request.js";
import Setting from "/src/setting";
import VueNotionRender from "@/components/render/vue-notion-render"
export default {
  name: "index-page",
  components: {
    NoTitlebar,VueNotionRender
  },
  data: () => ({ blockMap: null,data:[ {
          blockId: "fe30b1ce-84a7-47b3-abe1-b3448b989115",
          componentName: "Component1"
        },
        {
          blockId: "305fed49-f7e8-412f-80a1-b32e2bbd5a01",
          componentName: "Component2"
        }] }),
  async created() {
        // Retrieve block children and pass the results array to data
        // https://developers.notion.com/reference/get-block-children
        const data = await GetToDayTodo(Setting.NOTION_PAGE_ID)
        console.log(data.data.results);
        // this.data = data.data.results
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

<style></style>
