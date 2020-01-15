<template>
  <div class="infowindow-container">
    <div class="infowindow-close" @click="handleClick"><svg-icon icon-class="close" style="width: 9px;" /></div>
    <div class="infowindow-title">{{ deviceModelInfo.deviceModelName }}</div>
    <div v-if="deviceModelInfo && deviceModelInfo.data !== ''" class="infowindow-data"><span class="info-data"> {{ deviceModelInfo.data }}</span>{{ ' ' + deviceModelInfo.unit }}</div>
    <div>
      <img v-if="deviceModelInfo.online" :src="'/static/assets/device/' + deviceModelInfo.deviceModel + '.gif'" class="infowindow-img" alt="">
      <img v-else :src="'/static/assets/device/' + deviceModelInfo.deviceModel + '.jpg'" class="infowindow-img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    deviceModelInfo() {
      return this.$options.store.getters.getDeviceModelById(this.$options.id)
    }
  },
  methods: {
    handleClick(e) {
      var dom = e.currentTarget.parentNode
      dom.parentNode.removeChild(dom)
      this.$options.store.commit('removeDeviceModelEl', this.$options.id) // 当前 this 是 VueComponent 实例，使用 vuex 需要引用 vue 实例
    }
  }
}
</script>

<style lang="scss" scoped>
.infowindow {
  &-container {
    position: absolute;
    width: 130px;
    height: 140px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(24,144,255,0.40);
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  &-close {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 4px;
    cursor: pointer;
  }
  &-title {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #1890FF;
    letter-spacing: 0;
  }
  &-data {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: bold;
    color: #4B4B4B;
    letter-spacing: 0;
  }
  &-chart {
    width: 180px;
    height: 80px;
  }
  &-img {
    width: 80px;
    height: 80px;
  }
}
</style>
