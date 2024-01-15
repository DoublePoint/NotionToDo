<template>
  <div style="width: 100%; height: 100%">
    <vue-notion-render :unofficial="false" :data="data" />
    <!-- <No-Menu></No-Menu> -->
  </div>
</template>

<script >
import VueNotionRender from "@/components/render/vue-notion-render";
import NoMenu from "@/components/MainPage/Menu.vue";
import {GetToDayTodo} from "@/util/request.js";
import Setting from "/src/setting";

export default {
  name: "todo",
  components:{NoMenu,VueNotionRender},
  data: () => ({ blockMap: null,data:[ ] }),
  async created(){
    const data = await GetToDayTodo(Setting.NOTION_PAGE_ID);
    //console.log(data.data.results);
    this.data = data.data.results;
  }
};
</script>

<style lang="less" scoped></style>
