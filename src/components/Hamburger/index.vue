<template>
  <div>
    <el-tooltip class="item" effect="dark" content="点击隐藏/显示侧边栏" placement="bottom-start">
      <!-- <svg t="1492500959545" @click="toggleClick" class="hamburger" :class="{'is-active':isActive}" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
        <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path>
        <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path>
        <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694"></path>
      </svg>-->
      <svg
        t="1565664999285"
        class="hamburger"
        :class="{'is-active':isActive}"
        @click="toggleClick"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1979"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="32"
        height="32"
      >
        <path
          d="M870.4 256H153.6c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2h716.8c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2zM870.4 563.2H460.8c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2h409.6c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2zM870.4 870.4H153.6c-30.72 0-51.2-20.48-51.2-51.2s20.48-51.2 51.2-51.2h716.8c30.72 0 51.2 20.48 51.2 51.2s-20.48 51.2-51.2 51.2zM112.64 501.76l179.2-133.12c5.12-5.12 15.36 0 15.36 10.24v266.24c0 10.24-10.24 15.36-15.36 10.24l-179.2-133.12c-5.12-5.12-5.12-15.36 0-20.48z"
          fill="#606266"
          p-id="1110"
        />
      </svg>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(180deg);
  transition: 0.38s;
  transform-origin: 50% 50%;
}
.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
