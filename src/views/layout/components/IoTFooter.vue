<template>
  <div class="iot-footer" v-html="copyright"></div>
</template>
<script>
export default {
  name: 'IotFooter',
  data() {
    return {
      // copyright: '2017-2018&nbsp;中电海康集团有限公司&nbsp;Powered&nbsp;By&nbsp;&nbsp;研究院共性技术研究所'
      copyright: '2019中电海康集团有限公司技术研究中心'
    }
  }
}
</script>
<style lang="scss" scoped>
.iot-footer {
  position: absolute;
  bottom: 0;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #1F232C;
  font-size: 12px;
  color: #fff;
  left: 0;
  right: 0;
}
</style>


