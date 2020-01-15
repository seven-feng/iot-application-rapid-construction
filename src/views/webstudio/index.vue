<template>
  <div class="webstudio-container">
    <svg class="svg-marker">
      <defs>
        <marker id="arrow" markerUnits="strokeWidth" markerWidth="4" markerHeight="4" viewBox="0 0 4 4" refX="3" refY="2" orient="auto">
          <path xmlns="http://www.w3.org/2000/svg" d="M0,0 L0,4 L4,2" style="fill: #1890FF;" />
        </marker>
        <marker id="arrow_off" markerUnits="strokeWidth" markerWidth="4" markerHeight="4" viewBox="0 0 4 4" refX="3" refY="2" orient="auto">
          <path xmlns="http://www.w3.org/2000/svg" d="M0,0 L0,4 L4,2" style="fill: #999999;" />
        </marker>
      </defs>
    </svg>
    <div class="webstudio-header">
      <el-button class="webstudio-header-button" type="primary" size="small" @click="hanlePrePublic">Web可视化开发</el-button>
      <el-button class="webstudio-header-button" size="small">保存</el-button>
    </div>
    <tools />
    <div class="stage-wrapper">
      <div ref="stage" class="stage" @drop.prevent="drop" @dragover.prevent="allowDrop" @click="handleDefaultClick" @contextmenu="stageMenu" >
        <div ref="menu" class="menu">
          <div class="menu-item" @click="drawline">连线</div>
          <div class="menu-item" @click="showDetail">详情</div>
          <div class="menu-item" @click="deleteBox">删除</div>
        </div>
        <svg ref="tempsvg" xmlns="http://www.w3.org/2000/svg" version="1.1" style="position: absolute; top: 0; left: 0; z-index: 1; width: 1px; height: 1px; overflow: visible;"></svg>
      </div>
    </div>
    <attributes :attribute-info="attributeInfo" :panel-type="panelType" :connect-info="connectInfo" @style-change="styleChange" @saveDeviceModel="saveDeviceModel"/>
  </div>
</template>
<script>
import tools from './tools'
import attributes from './attributes'
import echarts from 'echarts'
import chartOptions from './chartOptions'
import chargedDevices from './deviceModel/chargedDevices'
import sensingDevices from './deviceModel/sensingDevices'
import infoWindow from './components/infoWindow'
import Vue from 'vue'
import { cubicBessel } from '@/utils/math'
import { getDeviceAttribute } from '@/api/device'
import { mapState } from 'vuex'
// import { models, lines } from './scence/scence5'

export default {
  components: {
    tools,
    attributes,
    infoWindow
  },
  data() {
    return {
      abc: '',
      attributeInfo: {
        id: '',
        deviceModel: '',
        deviceModelName: '',
        deviceSn: '',
        offsetx: 0,
        offsety: 0,
        width: 0,
        height: 0
      },
      panelType: 'default',
      currentTarget: null, // 当前选中 model
      currentLine: null, // 当前选中的 line
      lineFlag: false, // 标记是否正在连线
      connectInfo: { // 连接线对应字段
        id: '',
        fieldArray: [],
        field: '',
        from: {
          deviceModel: '',
          deviceSn: ''
        },
        to: {
          deviceModel: '',
          deviceSn: ''
        },
        rule: '',
        value: ''
      },
      isConfigEnter: false,
      scenceId: 0
    }
  },
  computed: {
    // deviceModelList 当前工作台上展示的设备模型列表
    // deviceModelData 左边栏提供选择的设备模型
    // lineList 设备模型连线列表
    ...mapState({
      deviceModelList: state => state.device.deviceModelList,
      deviceModelData: state => state.device.deviceModelData,
      lineList: state => state.device.lineList
    })
  },
  created() {
    const scenseDeviceData = sessionStorage.getItem('scenseDeviceData')
    if (!scenseDeviceData) { // 从工作台进入
      this.$store.commit('setSensingDeviceData', JSON.parse(JSON.stringify(sensingDevices)))
      this.$store.commit('setChargedDeviceData', JSON.parse(JSON.stringify(chargedDevices)))
      // 由于没有后端，需要把数据做一下统一处理
      this.$store.commit('setDeviceModelData', JSON.parse(JSON.stringify(sensingDevices)))
      this.$store.commit('setDeviceModelData', JSON.parse(JSON.stringify(chargedDevices)))
    } else { // 从设备模型配置进入
      const deviceModelData = JSON.parse(scenseDeviceData)
      // 初始化感知设备数据
      this.$store.commit('clearSensingDeviceData')
      for (let i = 0; i < deviceModelData.length; i++) {
        for (let j = 0; j < sensingDevices.length; j++) {
          if (deviceModelData[i].deviceModel === sensingDevices[j].deviceModel) {
            this.$store.commit('addSensingDeviceData', JSON.parse(JSON.stringify(sensingDevices[j])))
            this.$store.commit('addDeviceModelData', JSON.parse(JSON.stringify(sensingDevices[j])))
            break
          }
        }
      }
      // 初始化被控设备数据
      this.$store.commit('clearChargedDeviceData')
      for (let i = 0; i < deviceModelData.length; i++) {
        for (let j = 0; j < chargedDevices.length; j++) {
          if (deviceModelData[i].deviceModel === chargedDevices[j].deviceModel) {
            this.$store.commit('addChargedDeviceData', JSON.parse(JSON.stringify(chargedDevices[j])))
            this.$store.commit('addDeviceModelData', JSON.parse(JSON.stringify(chargedDevices[j])))
            break
          }
        }
      }
      this.isConfigEnter = true
    }
    this.$store.commit('clearDeviceModelList')
  },
  mounted() {
    this.scenceId = this.$route.query.scenceId
    if (!this.scenceId) return
    const { models, lines } = require('./scence/scence' + this.scenceId)
    if (this.isConfigEnter) {
      const self = this
      // 生成场景
      models.forEach(model => {
        const info = {
          id: model.id,
          deviceModel: model.deviceModel,
          deviceModelName: model.deviceModelName,
          type: 'img',
          src: '/static/assets/deviceModel/' + model.img
        }
        this.createDeviceModel(info, model.offsetX, model.offsetY, self.$refs.stage)
      })

      lines.forEach(line => {
        const startTarget = document.getElementById(line.from)
        const endTarget = document.getElementById(line.to)
        this.createLine(startTarget, endTarget, line.id)
      })
    }
  },
  methods: {
    handleIconRotate() {
      this.isRotateClass = !this.isRotateClass
    },
    allowDrop(e) {

    },
    dragstart(e) {
      this.removeBoxFocus(e.currentTarget.parentNode)
      this.panelType = 'deviceInfo'
      e.dataTransfer.setData('id', e.target.id)
      e.dataTransfer.setData('mousex', e.offsetX)
      e.dataTransfer.setData('mousey', e.offsetY)
    },
    drop(e) {
      this.removeBoxFocus(e.currentTarget)
      var id = e.dataTransfer.getData('id')
      var mousex = e.dataTransfer.getData('mousex') || 0
      var mousey = e.dataTransfer.getData('mousey') || 0
      var attributeInfo = {}
      if (id !== '') {
        var element = document.getElementById(id)
        if (e.target.tagName === 'IMG' || e.target.tagName === 'CANVAS') {
          element.style.left = element.offsetLeft + e.offsetX - mousex + 'px'
          element.style.top = element.offsetTop + e.offsetY - mousey + 'px'
          for (let i = 0; i < this.deviceModelList.length; i++) {
            if (this.deviceModelList[i].id === element.id) {
              attributeInfo = Object.assign({}, this.deviceModelList[i], {
                offsetx: element.style.left.substring(0, element.style.left.length - 2),
                offsety: element.style.top.substring(0, element.style.top.length - 2),
                width: element.clientWidth,
                height: element.clientHeight
              })
              break
            }
          }
        } else {
          element.style.left = e.offsetX - mousex + 'px'
          element.style.top = e.offsetY - mousey + 'px'
          for (let i = 0; i < this.deviceModelList.length; i++) {
            if (this.deviceModelList[i].id === element.id) {
              attributeInfo = Object.assign({}, this.deviceModelList[i], {
                offsetx: e.offsetX - mousex,
                offsety: e.offsetY - mousey,
                width: element.clientWidth,
                height: element.clientHeight
              })
              break
            }
          }
        }
        element.classList.add('box-shadow')
        // 信息窗口，跟随拖动
        for (let i = 0; i < this.deviceModelList.length; i++) {
          if (this.deviceModelList[i].id === id && this.deviceModelList[i].el) {
            this.$store.commit('updateElXY', {
              index: i,
              left: attributeInfo.offsetx,
              top: attributeInfo.offsety
            })
          }
        }
        for (let i = 0; i < this.lineList.length; i++) {
          if (this.lineList[i].from === id || this.lineList[i].to === id) {
            const element1 = document.getElementById(this.lineList[i].from)
            const element2 = document.getElementById(this.lineList[i].to)
            const line = document.getElementById(this.lineList[i].id)
            const pos = this.calPos(element1, element2)
            line.setAttribute('d', cubicBessel(pos.x1, pos.y1, pos.x2, pos.y2, pos.isVertical))
          }
        }
      } else {
        var info = JSON.parse(e.dataTransfer.getData('info'))
        if (info.type === 'img') {
          attributeInfo = this.createDeviceModel(info, e.offsetX - mousex, e.offsetY - mousey, e.target)
        }
      }
      this.attributeInfo = attributeInfo
      this.panelType = 'deviceInfo'
    },
    createDeviceModel(info, offsetX, offsetY, el) {
      var img = document.createElement(info.type)
      img.src = info.src
      img.draggable = false
      img.style.display = 'block' // img 和 外层 div 高度不一
      img.className = 'device-img'
      var div = document.createElement('div')
      div.appendChild(img)
      div.style.position = 'absolute'
      div.style.left = offsetX + 'px'
      div.style.top = offsetY + 'px'
      div.className = 'device-model'
      div.id = info.id || info.deviceModel + '-' + new Date().valueOf().toString().substring(5) // 时间戳，取后8位
      div.draggable = true
      div.tabIndex = '0'
      div.addEventListener('dragstart', this.dragstart)
      div.addEventListener('click', this.modelFocus)
      div.addEventListener('contextmenu', this.contextmenu)
      div.addEventListener('keyup', this.handleDeleteKeyUp)
      el.appendChild(div)
      div.classList.add('box-shadow')
      div.focus() // 聚焦
      this.currentTarget = div
      // 生成 deviceModel 对象,放入 deviceModelList 中
      for (let i = 0; i < this.deviceModelData.length; i++) {
        if (this.deviceModelData[i].deviceModel === info.deviceModel) {
          var tempDeviceModel = {
            id: div.id,
            deviceModelId: this.deviceModelData[i].deviceModelId,
            deviceModel: this.deviceModelData[i].deviceModel,
            deviceModelName: this.deviceModelData[i].deviceModelName,
            unit: this.deviceModelData[i].unit,
            unitName: this.deviceModelData[i].unitName,
            isAllOrNoting: this.deviceModelData[i].isAllOrNoting,
            deviceSn: '',
            deviceName: '',
            data: '',
            ws: ''
          }
          this.$store.commit('addDeviceModel', tempDeviceModel)
          return Object.assign(tempDeviceModel, {
            offsetx: offsetX,
            offsety: offsetY,
            width: div.clientWidth, // 元素可见宽度
            height: div.clientHeight // 元素可见高度
          })
        }
      }
    },
    createLine(startTarget, endTarget, lineid = '') {
      const self = this
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.style.position = 'absolute'
      svg.style.top = 0 + 'px'
      svg.style.left = 0 + 'px'
      svg.style.width = 1 // 默默隐藏
      svg.style.height = 1
      svg.style['z-index'] = 0
      svg.style.overflow = 'visible'
      svg.addEventListener('click', function(e) {
        e.stopPropagation()
        const el = e.currentTarget.firstChild
        if (self.currentLine && self.currentLine !== el) {
          self.currentLine.classList.remove('svg-line-bold')
        }
        self.currentLine = el
        el.classList.add('svg-line-bold')
        self.panelType = 'connectInfo'
        const deviceModelId = self.$store.getters.getDeviceModelIdFromLine(self.currentLine.id, 'from')
        if (deviceModelId) {
          getDeviceAttribute(deviceModelId).then(res => {
            if (res && res.data && res.data.result && res.data.result.attributeList) {
              const start = self.$store.getters.getDeviceModelById(startTarget.id)
              const end = self.$store.getters.getDeviceModelById(endTarget.id)
              const lineInfo = self.$store.getters.getLineById(self.currentLine.id)
              self.connectInfo = {
                id: self.currentLine.id,
                from: {
                  deviceModel: start.deviceModel,
                  deviceSn: start.deviceSn
                },
                to: {
                  deviceModel: end.deviceModel,
                  deviceSn: end.deviceSn
                },
                fieldArray: [],
                field: lineInfo.field,
                rule: lineInfo.rule,
                value: lineInfo.value
              }
              const list = res.data.result.attributeList
              for (let i = 0; i < list.length; i++) {
                self.connectInfo.fieldArray.push({
                  label: list[i].label,
                  field: list[i].fieldName
                })
              }
            }
          })
        }
      })
      const lineId = lineid || 'line-' + new Date().valueOf().toString().substring(5)
      const pos = this.calPos(startTarget, endTarget)
      svg.innerHTML = '<path class="svg-line" id="' + lineId + '" d="' + cubicBessel(pos.x1, pos.y1, pos.x2, pos.y2, pos.isVertical) + '" marker-end="url(#arrow)"></path>'
      this.$refs.stage.appendChild(svg)

      this.$store.commit('addLine', {
        id: lineId,
        from: startTarget.id,
        to: endTarget.id
      })
    },
    showDetail(e) {
      e.stopPropagation()
      const currentTarget = this.currentTarget
      currentTarget.focus() // 聚焦
      var id = currentTarget.id
      var index = -1
      for (let i = 0; i < this.deviceModelList.length; i++) {
        if (this.deviceModelList[i].id === id) {
          if (!this.deviceModelList[i].el) {
            index = i
          }
          break
        }
      }
      if (index !== -1) {
        var left = currentTarget.offsetLeft
        left = left + 60 + 'px'
        var top = currentTarget.offsetTop
        top = top - 10 + 'px'
        var Component = Vue.extend(infoWindow)
        var dom = document.createElement('div')
        currentTarget.parentNode.appendChild(dom)
        var comp = new Component({ 'id': id, 'store': this.$store }).$mount(dom)
        comp.$el.style.left = left
        comp.$el.style.top = top

        this.$store.commit('addDeviceModelEl', {
          index: index,
          el: comp.$el
        })
      }
      this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
    },
    modelFocus(e) {
      e.stopPropagation()
      if (this.lineFlag && this.currentTarget !== e.currentTarget) {
        this.$refs.stage.removeEventListener('mousemove', this.mousemoveHandler) // 取消虚拟画线
        this.createLine(this.currentTarget, e.currentTarget) // 画线

        const el = document.getElementById('temp-line')
        el.parentNode.removeChild(el)
        this.lineFlag = false // 结束连线阶段
        return
      }

      this.currentTarget = e.currentTarget
      this.removeBoxFocus(e.currentTarget.parentNode)
      e.target.parentNode.classList.add('box-shadow')

      for (let i = 0; i < this.deviceModelList.length; i++) {
        if (this.deviceModelList[i].id === e.currentTarget.id) {
          this.attributeInfo = Object.assign({}, this.deviceModelList[i], {
            offsetx: e.currentTarget.offsetLeft,
            offsety: e.currentTarget.offsetTop,
            width: e.currentTarget.clientWidth,
            height: e.currentTarget.clientHeight
          })
          break
        }
      }
      this.panelType = 'deviceInfo'
    },
    handleDefaultClick(e) {
      this.removeBoxFocus(e.currentTarget)
      this.currentTarget = null // 清空当前选中 model
      this.removeLineFocus() // 清空当前选中 line
      if (this.lineFlag) {
        document.getElementsByClassName('stage')[0].removeEventListener('mousemove', this.mousemoveHandler) // 取消虚拟画线
        const el = document.getElementById('temp-line')
        el.parentNode.removeChild(el)
        this.lineFlag = false // 清空当前连线状态
      }
      this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
    },
    removeLineFocus() { // 清空连线选中
      if (this.currentLine) {
        this.currentLine.classList.remove('svg-line-bold')
        this.currentLine = null
      }
    },
    removeBoxFocus(e) {
      // 去除选中框
      Array.prototype.slice.call(e.childNodes).forEach(node => {
        if (node.classList && node.classList.contains('box-shadow')) {
          node.classList.remove('box-shadow')
        }
      })
      this.panelType = 'default'
    },
    styleChange(attributeName, id) {
      var element = document.getElementById(id)
      var attr = ''
      switch (attributeName) {
        case 'offsetx':
          attr = 'left'
          break
        case 'offsety':
          attr = 'top'
          break
        default:
          attr = attributeName
      }
      element.style[attr] = this.attributeInfo[attributeName] + 'px'
      // resize
      var chart = echarts.getInstanceByDom(element)
      if (chart) {
        chart.resize()
      }
    },
    saveDeviceModel(info) {
      for (let i = 0; i < this.deviceModelList.length; i++) {
        if (this.deviceModelList[i].id === info.id) {
          this.deviceModelList[i].deviceModelName = info.deviceModelName
          this.deviceModelList[i].deviceSn = info.deviceSn
          break
        }
      }
    },
    chartOption(chartType) {
      // 返回不同类型的默认图表配置
      switch (chartType) {
        case 'barchart': return chartOptions.barchartOption
        case 'linechart': return chartOptions.linechartOption
      }
    },
    deleteBox(e) {
      e.stopPropagation()
      const target = this.currentTarget
      const id = target.id
      for (let i = 0; i < this.deviceModelList.length; i++) {
        if (this.deviceModelList[i].id === id) {
          const el = this.deviceModelList[i].el
          el && target.parentNode.removeChild(el) // 删除信息窗口
          const ws = this.deviceModelList[i].ws
          ws && ws.close() // 关闭 websocket
          break
        }
      }
      for (let i = 0; i < this.lineList.length; i++) {
        if (this.lineList[i].from === id || this.lineList[i].to === id) {
          const element = document.getElementById(this.lineList[i].id)
          element.parentNode.parentNode.removeChild(element.parentNode) // 删除连线
          this.$store.commit('removeLine', i)
        }
      }
      target.parentNode.removeChild(target) // 删除设备模型
      this.$store.commit('removeDeviceModelListItem', id)
      this.panelType = 'default'
      this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
    },
    handleDeleteKeyUp(e) {
      var event = e || window.event
      debugger
      const id = event.target.id
      switch (event.code) {
        case 'Delete':
          for (let i = 0; i < this.deviceModelList.length; i++) {
            if (this.deviceModelList[i].id === id) {
              const el = this.deviceModelList[i].el
              el && event.target.parentNode.removeChild(el) // 删除信息窗口
              const ws = this.deviceModelList[i].ws
              ws && ws.close() // 关闭 websocket
              break
            }
          }
          for (let i = 0; i < this.lineList.length; i++) {
            if (this.lineList[i].from === id || this.lineList[i].to === id) {
              const element = document.getElementById(this.lineList[i].id)
              element.parentNode.parentNode.removeChild(element.parentNode) // 删除连线
              this.$store.commit('removeLine', i)
            }
          }
          event.target.parentNode.removeChild(event.target) // 删除设备模型
          this.$store.commit('removeDeviceModelListItem', id)
          this.panelType = 'default'
          this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
          break
      }
    },
    stageMenu(e) {
      e.preventDefault()
      if (this.currentTarget) {
        this.currentTarget.focus() // 聚焦
      }
      if (this.lineFlag) {
        document.getElementsByClassName('stage')[0].removeEventListener('mousemove', this.mousemoveHandler) // 取消虚拟画线
        const el = document.getElementById('temp-line')
        el.parentNode.removeChild(el)
        this.lineFlag = false // 清空当前连线状态
      }
      this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
    },
    contextmenu(e) {
      e.preventDefault()
      this.modelFocus(e)
      let left = e.offsetX + e.currentTarget.offsetLeft
      let top = e.offsetY + e.currentTarget.offsetTop
      const menu = this.$refs.menu
      const stage = this.$refs.stage
      if (left + menu.offsetWidth > stage.offsetWidth) {
        left = stage.offsetWidth - menu.offsetWidth - 2
      }
      if (top + menu.offsetHeight > stage.offsetHeight) {
        top = stage.offsetHeight - menu.offsetHeight - 4
      }
      menu.style.left = left + 'px'
      menu.style.top = top + 'px'
      menu.style.display = 'block'
    },
    /**
     * 计算连接点
     */
    calPos(element1, element2) {
      let x1, y1, x2, y2, isVertical
      if (Math.abs(element1.offsetTop - element2.offsetTop) > Math.abs(element1.offsetLeft - element2.offsetLeft)) {
        isVertical = true
        if (element1.offsetTop > element2.offsetTop) {
          x1 = element1.offsetLeft + element1.offsetWidth / 2
          y1 = element1.offsetTop
          x2 = element2.offsetLeft + element2.offsetWidth / 2
          y2 = element2.offsetTop + element2.offsetHeight
        } else {
          x1 = element1.offsetLeft + element1.offsetWidth / 2
          y1 = element1.offsetTop + element1.offsetHeight
          x2 = element2.offsetLeft + element2.offsetWidth / 2
          y2 = element2.offsetTop
        }
      } else {
        isVertical = false
        if (element1.offsetLeft < element2.offsetLeft) {
          x1 = element1.offsetLeft + element1.offsetWidth
          y1 = element1.offsetTop + element1.offsetHeight / 2
          x2 = element2.offsetLeft
          y2 = element2.offsetTop + element2.offsetHeight / 2
        } else {
          x1 = element1.offsetLeft
          y1 = element1.offsetTop + element1.offsetHeight / 2
          x2 = element2.offsetLeft + element2.offsetWidth
          y2 = element2.offsetTop + element2.offsetHeight / 2
        }
      }
      return {
        x1,
        y1,
        x2,
        y2,
        isVertical
      }
    },
    /**
     * 连线
     */
    drawline(e) {
      e.stopPropagation()
      const self = this
      this.lineFlag = true
      this.$refs.menu.style.display = 'none' // 隐藏右键菜单栏
      this.$refs.tempsvg.innerHTML = '<path class="svg-temp-line" id="temp-line" d="" marker-end="url(#arrow_off)"></path>'
      this.$refs.stage.addEventListener('mousemove', self.mousemoveHandler)
    },
    mousemoveHandler(e) {
      e.stopPropagation()
      let x = e.offsetX
      let y = e.offsetY
      if (e.target.tagName !== 'DIV' && e.target.tagName !== 'path') {
        const xx = e.target.parentNode.offsetLeft
        x += xx
        const yy = e.target.parentNode.offsetTop
        y += yy
      }
      const element = { offsetTop: y, offsetLeft: x, offsetWidth: 0, offsetHeight: 0 }
      const pos = this.calPos(this.currentTarget, element)
      const tempLine = document.getElementById('temp-line')
      tempLine.setAttribute('d', cubicBessel(pos.x1, pos.y1, pos.x2, pos.y2, pos.isVertical, true))
    },
    hanlePrePublic() {
      this.$router.push({ path: 'deviceMap', query: { scenceId: this.scenceId }})
    }
  }
}
</script>

<style lang="scss" scoped>
  .webstudio-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: rgb(240,242,246);
    padding: 55px 370px 10px;
  }
  .webstudio-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 45px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    &-button {
      margin-right: 15px;
    }
  }
  .stage-wrapper {
    height: 100%;
    position: relative;
  }
  .stage {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      border: 1px solid #dddddd;
    }
  .menu {
    width: 80px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
    display: none;
    padding: 5px 0;
    z-index: 2;
    &-item {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      overflow: hidden;
      text-align: center;
      &:hover {
        color: #1890FF;
        background-color: hsla(0,0%,84.7%,.2);
      }
    }
  }
  .svg-marker {
    position: absolute;
    z-index: -1;
  }
</style>

<style lang="scss">
  .box-shadow {
    box-shadow: 0 0 0 10px #D6E5FF;
    border-radius: 2px;
  }
  .device-img {
    width: 100%;
    height: 100%;
  }
  .device-model {
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 0 10px #D6E5FF;
      border-radius: 2px;
    }
    &-hover {
      cursor: pointer;
      box-shadow: 0 0 0 10px #D6E5FF;
      border-radius: 2px;
    }
    &-icon {
      font-size: 36px;
    }
  }
  .chart-model {
    box-sizing: border-box;
    width: 400px;
    height: 300px;
    &:hover {
      box-shadow: 0 0 0 10px #D6E5FF;
    }
  }
  .svg-temp-line {
    stroke-width: 2;
    fill: none;
    stroke: #999999;
  }
  .svg-line {
    stroke-width: 2;
    fill: none;
    stroke: #1890FF;
    &:hover {
      cursor: pointer;
      stroke-width: 3;
    }
  }
  .svg-line-bold {
    stroke-width: 3;
  }
</style>
