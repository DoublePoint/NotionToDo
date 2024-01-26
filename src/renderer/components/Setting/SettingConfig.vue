<template>
  <div class="Container">
    <p class="Drawer-heading">Settings</p>
    <div class="Setting-wrapper">
      <p class="Setting-title">置顶{{ alwaysOnTop }}</p>
      <div
        class="Checkbox"
        @click="selectAlwaysOnTop"
        :class="alwaysOnTop ? 'is-active' : 'is-inactive'"
      ></div>
    </div>
    <p class="Drawer-heading">时间{{ refreshTime }}</p>
    <div class="Setting-wrapper">
      <p class="Setting-title">刷新时间（分钟）</p>
      <p class="Setting-value">{{ refreshTime + ':00' }}</p>
      <div class="Slider-wrapper">
        <input
          type="range"
          min="1"
          :max="maxTime"
          step="1"
          class="Slider Slider--red"
          v-model.number="refreshTime"
          @change="setTimeWork($event, 'work')"
        />
        <div
          class="Slider-bar Slider-bar--red"
          :style="{ width: calcPercentage(refreshTime, maxTime) + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import ShortcutInput from './ShortcutInput'

export default {
  name: 'Drawer-settings',

  data(){
    return {
      maxTime: 90,
      refreshTime: this.$store.getters["View/refreshTime"]
    }
  },
  computed: {
    alwaysOnTop() {
      return this.$store.getters["View/alwaysOnTop"]
    }
  },
  methods: {
    selectAlwaysOnTop() {
      const payload = {
        key: 'alwaysOnTop',
        val: !this.alwaysOnTop
      }
      console.log(`this.alwaysOnTop:${this.alwaysOnTop};this.$store.getters["View/alwaysOnTop"]:${this.$store.getters["View/alwaysOnTop"]}`);
      ipcRenderer.send('toggle-alwaysOnTop', !this.alwaysOnTop)
      this.$store.dispatch('View/setSetting', payload)
    },
    setTimeWork(e, setting) {
      const payload = {
        key: 'refreshTime',
        val: parseInt(this.refreshTime)
      }
      this.$store.dispatch('View/setSetting',payload)
      this.refreshTime = e.target.value
      // this.checkToResetTimer(setting)
    },
    calcPercentage(val, max) {
      return (val / max) * 100
    },
  },
  components: {
    ShortcutInput
  }
}
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
</style>
