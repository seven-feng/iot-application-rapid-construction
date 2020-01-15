<template>
  <div class="options-container">
    <div class="option-container" v-if="selectedOption === 'list'">
      <div class="option-header-container">自定义列表</div>
      <div class="option-content-container">
        <el-form ref="form" :model="options.list" label-width="100px">
          <el-form-item label="表头颜色：">
            <el-color-picker v-model="options.list.headerColor" @change="setTableHeaderColor"></el-color-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedOption: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      options: {
        list: {
          headerColor: '#fff'
        }
      }
    }
  },
  methods: {
    setTableHeaderColor() {
      this.$emit('updateTable', 'setTableHeaderColor', this.options.list.headerColor)
    }
  }
}
</script>

<style lang="scss" scoped>
  .options-container {
    width: 100%;
    height: 100%;
    .option-container {
      display: flex;
      flex-direction: column;
      .option-header-container {
        height: 48px;
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #2B2B2B;
        line-height: 48px;
        padding-left: 16px;
        border-bottom: 1px solid #DDDDDD;
      }
      .option-content-container {
        flex: 1;
        padding: 18px 10px;
        .dropdown-icon-container {
          height: 36px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>