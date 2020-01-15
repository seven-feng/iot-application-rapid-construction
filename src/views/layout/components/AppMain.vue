<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view @scenseTitle="getScenseTitle"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      scenseTitle: null
    }
  },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  methods: {
    getScenseTitle(val) {
      this.scenseTitle = val
      this.$emit('scenseTitle', this.scenseTitle)
    }
  }
}
</script>



