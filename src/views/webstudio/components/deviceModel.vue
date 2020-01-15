<template>
  <div :data-devicemodelname ="device.deviceModelName" :data-devicemodel="device.deviceModel" class="devicemodel-container" draggable="true" data-type="img" @dragstart="dragstart">
    <img :src="'/static/assets/deviceModel/' + device.img" draggable="false" alt="">
    <span class="devicemodel-name">{{ device.deviceModelName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    device: {
      type: Object,
      default: function() {
        return {
          deviceModel: '',
          deviceModelName: '',
          img: ''
        }
      }
    }
  },
  methods: {
    dragstart(e) {
      var deviceModel = e.target.getAttribute('data-devicemodel')
      var deviceModelName = e.target.getAttribute('data-devicemodelname')
      var type = e.target.getAttribute('data-type')
      var src = e.target.firstChild.getAttribute('src')
      var info = {
        deviceModel,
        deviceModelName,
        type,
        src
      }
      e.dataTransfer.setData('info', JSON.stringify(info))
      // e.offsetX 鼠标相对于触发事件源 x 轴的位置
      // (div.width - img.width) / 2
      // (div.height - img.height) / 4
      e.dataTransfer.setData('mousex', e.offsetX - (e.target.clientWidth - e.target.childNodes[0].clientWidth) / 2)
      e.dataTransfer.setData('mousey', e.offsetY - (e.target.clientHeight - e.target.childNodes[0].clientHeight - e.target.childNodes[2].clientHeight) / 4)
    }
  }
}
</script>

<style lang="scss" scoped>
.devicemodel {
  &-container {
    width: 90px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    &:hover {
      background-color: #f5f5f6;
    }
  }
  &-name {
    width: 85px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #4B4B4B;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
