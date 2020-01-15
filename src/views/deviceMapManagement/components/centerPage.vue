<template>
  <div class="center-page-container">
    <div class="header-container">
      {{ title.split("：")[1] }}
    </div>
    <div class="content-container">
      <div class="left-container">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          background-color="#1f232c"
          text-color="rgb(183, 202, 238)">
          <el-menu-item :index="1">
            <i class="el-icon-map-location"></i>
            <span slot="title">设备地图</span>
          </el-menu-item>
          <el-menu-item :index="2">
            <i class="el-icon-tickets"></i>
            <span slot="title">设备列表</span>
          </el-menu-item>
          <el-menu-item :index="3">
            <i class="el-icon-bell"></i>
            <span slot="title">报警管理</span>
          </el-menu-item>
          <el-menu-item :index="4">
            <i class="el-icon-s-data"></i>
            <span slot="title">数据分析</span>
          </el-menu-item>
          <el-menu-item :index="5">
            <i class="el-icon-setting"></i>
            <span slot="title">基础设置</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="center-container">
        <el-card :class="{'map-card-container': defaultActive === 1}">
          <slot>Mian</slot>
        </el-card>
      </div>
    </div>
  </div>
</template>

 <script>
 import GLOBAL from '@/constant/constant'
 export default {
   props: {
     scenceId: {
       type: Number,
       default: null
     },
     defaultActive: {
       type: Number,
       default: 1
     }
   },
   data() {
     return {
       title: '：自定义标题',
       scenseDataList: GLOBAL.scenseDataList
     }
   },
   created() {
     const selectedScense = this.scenseDataList.find(scenseData => scenseData.id === this.scenceId)
     if (selectedScense) {
       this.title = selectedScense.title
     }
   }
 }
 </script>

 <style lang="scss" scoped>
   .center-page-container {
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column;
     .header-container {
       width: 100%;
       height: 40px;
       line-height: 40px;
       font-size: 20px;
       color: #fff;
       background-color: #242839;
       padding-left: 10px;
     }
     .content-container {
       display: flex;
       height: calc(100% - 40px);
       .left-container {
         width: 150px;
         background-color: rgb(31, 35, 44);
       }
       .center-container {
         width: calc(100% - 150px);
         background-color: #f0f2f5;
         padding: 10px;
         overflow-y: auto;
         position: relative;
         .map-card-container {
          height: 100%;
           /deep/ .el-card__body {
             height: 100%;
             padding: 0px;
           }
         }
       }
     }
   }
 </style>