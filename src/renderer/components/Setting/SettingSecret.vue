!
<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    <p class="Setting-title">Secret Key</p>
    <input
      class="Setting-input"
      v-model="secretKey"
      @onchange="changeSecretKey($event)"
    />
    <br />
    <br />
    <p class="Setting-title">Notion Page Url</p>
    <input
      class="Setting-input"
      v-model="notionPageUrl"
      @onchange="changeNotionPageUrl($event)"
    />
  </div>
</template>

<script>
import { BuildPageId } from "@/util/request";
export default {
  name: "Drawer-settings",
  computed: {},
  data() {
    return {
      secretKey: this.$store.getters["SecretSetting/secretKey"],
      notionPageUrl: this.$store.getters["SecretSetting/notionPageUrl"],
    };
  },
  watch: {
    secretKey(newVal) {
      this.$store.dispatch("SecretSetting/SET_SECRET_KEY", newVal);
      this.initHttpHeaderSecretKey();
    },
    notionPageUrl(newVal) {
      debugger;
      this.$store.dispatch("SecretSetting/SET_NOTION_PAGE_URL", newVal);
      const pageId = BuildPageId(newVal);
      if (!pageId) {
        alert("Error");
        return;
      }
      this.$localStore.set("NOTION_PAGE_ID", pageId);
    },
  },
  methods: {
    initHttpHeaderSecretKey(e) {
      //设置SecretKey
      this.$http.interceptors.request.use(
        (config) => {
          //config.data = JSON.stringify(config.data);
          config.headers["Authorization"] = `Bearer ${val}`;
          return config;
        },
        (error) => {
          return Promise.reject(error.response);
        }
      );
    },
  },
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
  width: 100%;
  display: block;
}
.Setting-input {
  width: 100%;
  display: block;
  margin-top: 5px;
}
.Drawer-heading {
  display: inline-block;
  text-align: center;
  width: 100%;
}
</style>
