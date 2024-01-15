!
<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    
    <div class="Setting-wrapper">
        <p class="Setting-title">Secret Key</p>
        <input v-model="secretKey" @onchange="changeSecretKey($event)" />
    </div>
    <div class="Setting-wrapper">
        <p class="Setting-title">Notion Page Url</p>
        <br/>
        <input v-model="notionPageUrl" @onchange="changeNotionPageUrl($event)" />
    </div>
  </div>
</template>

<script>

export default {
  name: "Drawer-settings",
  computed: {
    
  },
  data() {
    return {
      secretKey:this.$store.getters["SecretSetting/secretKey"],
      notionPageUrl:this.$store.getters["SecretSetting/notionPageUrl"],
    };
  },
  watch:{
    secretKey(newVal){
      this.$store.dispatch("SecretSetting/SET_SECRET_KEY",newVal);
    },
    notionPageUrl(newVal){
      this.$store.dispatch("SecretSetting/SET_NOTION_PAGE_URL",newVal);
    }
  },
  methods: {
    changeSecretKey(e){
      var val = e.target.value;
      this.$store.commit("SecretSetting/SET_SECRET_KEY",val);
    },
    changeNotionPageUrl(e){
      var val = e.target.value;
      this.$store.commit("SecretSetting/SET_NOTION_PAGE_URL",val);
    }
    
  },
  created(){
    //console.log(this.$store.getters);
    //console.log('this.$store.getters["SecretSetting/secretKey"]'+this.$store.getters["SecretSetting/secretKey"]);
    //console.log('this.$store.getters["SecretSetting/notionPageUrl"]'+this.$store.getters["SecretSetting/notionPageUrl"]);
  }
};
</script>

<style lang="less" scoped>
.Checkbox {
  background-color: var(--color-background);
  border: 2px solid var(--color-background-lightest);
  border-radius: 100%;
  display: inline-block;
  transition: @transitionDefault;
  width: 16px;
  height: 16px;
  &:hover {
    border-color: var(--color-accent);
  }
  &.is-active {
    background-color: var(--color-accent);
    border-color: var(--color-background);
    &:hover {
      background-color: var(--color-accent);
      border-color: var(--color-background-lightest);
    }
  }
}

.Container {
  max-height: calc(100% - 36px);
  overflow-y: auto;
}

.Setting-wrapper {
  background-color: var(--color-background);
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  padding: 12px;
}

.Setting-title {
  color: var(--color-foreground-darker);
  font-size: 14px;
  letter-spacing: 0.05em;
}

.Drawer-heading{
    display: inline-block;
    text-align: center;
    width: 100%;
    
}
</style>
