<template>
  <div>
    <router-view></router-view>
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

<style lang="scss" scoped></style>
