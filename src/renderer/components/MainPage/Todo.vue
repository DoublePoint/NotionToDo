<template>
  <div
    v-cloak
    style="
      width: calc(100% - 20px);
      height: calc(100% - 20px);
      padding: 10px;
      overflow: scroll;
    "
  >
    <h4 style="text-align: center; margin: 5px">{{ todayPageTitle }}</h4>
    <p class="Drawer-heading" v-if="todayPageTitle && updateTime">
      <span >上次更新时间：{{ updateTime }}</span>
    </p>
    <div class="loading" v-if="showLoading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      v-else
      class="refreshImg"
      title="refresh"
      @click="refreshData"
      width="800px"
      height="800px"
      viewBox="2 2 20 20"
      fill="none"
    >
      <path
        opacity="0.5"
        d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447Z"
        fill="#1C274C"
      />
      <path
        d="M12.0096 5.25C8.62406 5.25 5.83333 7.79988 5.46058 11.0833H5.00002C4.69658 11.0833 4.42304 11.2662 4.30701 11.5466C4.19099 11.8269 4.25534 12.1496 4.47005 12.364L5.63832 13.5307C5.93113 13.8231 6.40544 13.8231 6.69825 13.5307L7.86651 12.364C8.08122 12.1496 8.14558 11.8269 8.02955 11.5466C7.91353 11.2662 7.63998 11.0833 7.33654 11.0833H6.97332C7.33642 8.63219 9.45215 6.75 12.0096 6.75C13.541 6.75 14.9136 7.42409 15.8479 8.49347C16.1204 8.80539 16.5942 8.83733 16.9061 8.56479C17.2181 8.29226 17.25 7.81846 16.9775 7.50653C15.7702 6.12471 13.9916 5.25 12.0096 5.25Z"
        fill="#1C274C"
      />
      <path
        d="M18.3618 10.4693C18.069 10.1769 17.5947 10.1769 17.3018 10.4693L16.1336 11.636C15.9189 11.8504 15.8545 12.1731 15.9705 12.4534C16.0866 12.7338 16.3601 12.9167 16.6636 12.9167H17.0268C16.6637 15.3678 14.548 17.25 11.9905 17.25C10.4591 17.25 9.08654 16.5759 8.15222 15.5065C7.87968 15.1946 7.40589 15.1627 7.09396 15.4352C6.78203 15.7077 6.7501 16.1815 7.02263 16.4935C8.22995 17.8753 10.0085 18.75 11.9905 18.75C15.376 18.75 18.1668 16.2001 18.5395 12.9167H19.0001C19.3035 12.9167 19.5771 12.7338 19.6931 12.4534C19.8091 12.1731 19.7448 11.8504 19.53 11.636L18.3618 10.4693Z"
        fill="#1C274C"
      />
    </svg>
    <span class="errorMsg" v-if="errorMsg">请求出错: {{ errorMsg }}</span>
    <vue-notion-render :unofficial="false" :data="data" />
  </div>
</template>

<script>
import VueNotionRender from "@/components/render/vue-notion-render";
import NoMenu from "@/components/MainPage/Menu.vue";
import { GetTodayTodo } from "@/util/request.js";
import { createLocalStore } from "@/util/LocalStore.js";
import * as dayjs from "dayjs";

export default {
  name: "todo",
  components: { NoMenu, VueNotionRender },
  data: () => {
    return {
      blockMap: null,
      data: [],
      showLoading: true,
      errorMsg: "",
      updateTime: "",
      todayPageTitle: "",
    };
  },
  created() {
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, 600000);
  },
  methods: {
    async loadData() {
      this.showLoading = true;
      try {
        const pageId = createLocalStore().get("NOTION_PAGE_ID");
        const { data, todayPageTitle } = await GetTodayTodo(pageId);
        this.todayPageTitle = todayPageTitle;
        this.updateTime = dayjs().format("hh:mm:ss");
        // this.today = dayjs().format("YYYY-MM-DD")
        if (data.msg) {
          this.errorMsg = data.msg;
        } else {
          this.errorMsg = null;
        }
        if (data.response && data.response.status != "200") {
          this.errorMsg = data.response.data;
        } else {
          this.data = data.data.results;
        }
      } catch (error) {}
      this.showLoading = false;
    },
    refreshData() {
      this.loadData();
    },
  },
};
</script>

<style lang="less" scoped>
.Drawer-heading{
  padding-top: 0;
}
.refreshImg {
  width: 26px;
  height: 26px;
  background: var(--color-foreground);
  // background: var(--color-accent);
  border-radius: 13px;
  position: absolute;
  right: 15px;
  // bottom: 15px;
  &:hover {
    cursor: pointer;
    background: var(--color-background-lightest);
  }
}
.errorMsg {
  color: red;
}
</style>
<style>
.loading,
.loading > div {
  position: relative;
  box-sizing: border-box;
}

.loading {
  display: block;
  font-size: 0;
  color: var(--color-long-round);
}

.loading.la-dark {
  color: #333;
}

.loading > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading {
  width: 100%;
  height: 15px;
  font-size: 0;
  text-align: center;
}

.loading > div {
  display: inline-block;
  width: 10px;
  height: 10px;
  white-space: nowrap;
  border-radius: 100%;
  animation: ball-elastic-dots-anim 1s infinite;
}

@keyframes ball-elastic-dots-anim {
  0%,
  100% {
    margin: 0;
    transform: scale(1);
  }

  50% {
    margin: 0 5%;
    transform: scale(0.65);
  }
}
</style>
