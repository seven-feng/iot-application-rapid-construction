<template>
  <div class="ace-container">
    <div class="ace-editor" ref="ace"></div>
  </div>
</template>

<script>
  import ace from 'ace-builds'
  import 'ace-builds/webpack-resolver' // 在 webpack 环境中使用必须要导入
  import 'ace-builds/src-noconflict/theme-chrome' // 默认设置的主题
  import 'ace-builds/src-noconflict/mode-javascript' // 默认设置的语言模式

  export default {
    mounted() {
      this.aceEditor = ace.edit(this.$refs.ace, {
        maxLines: 20, // 最大行数，超过会自动出现滚动条
        minLines: 10, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
        fontSize: 14, // 编辑器内字体大小
        theme: this.themePath, // 默认设置的主题
        mode: this.modePath, // 默认设置的语言模式
        tabSize: 4 // 制表符设置为 4 个空格大小
      })
    },
    data() {
      return {
        aceEditor: null,
        themePath: 'ace/theme/chrome', // 不导入 webpack-resolver，该模块路径会报错
        modePath: 'ace/mode/javascript' // 同上
      }
    }
  }
</script>