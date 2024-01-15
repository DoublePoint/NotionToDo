<template>
  <div style="height: 100%;">
    <div class="mainpage">
      <router-view></router-view>
    </div>
    <No-Menu></No-Menu>
  </div>
</template>

<script>
import NoMenu from "@/components/MainPage/Menu.vue";

export default {
  name: "Setting",
  components: { NoMenu },
  data: () => ({}),
  async created() {},
};
</script>

<style lang="less" scoped>
.mainpage{
  height: calc(100% - 36px);
  background: var(--color-background-light);
}
</style>
