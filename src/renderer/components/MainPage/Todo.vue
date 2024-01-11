!<template>
    <div style="width: 100%;height: 100%;">
        <webview id="geekori" src="http://www.baidu.com" style="width:100%; height:100%" nodeintegration="true"></webview>
        <No-Menu></no-Menu>
    </div>
</template>

<script>
import NoMenu from '@/components/MainPage/Menu.vue'
    export default {
        components:{NoMenu}
    }
</script>

<style lang="less" scoped>

</style>