<template>
  <div class="attributes-container">
    <div v-show="panelType === 'default'" />
    <el-tabs v-show="panelType === 'deviceInfo'" v-model="activeName1" type="card">
      <el-tab-pane label="设备样式" name="style">
        <div class="attributes-block">
          <el-row :gutter="20" style="margin-bottom: 10px;">
            <el-col :span="10">
              <el-input v-model="attributeInfo.offsetx" class="attribute-input" @input="$emit('style-change', 'offsetx', attributeInfo.id)">
                <div slot="suffix" class="attribute-input-label">X</div>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="attributeInfo.offsety" class="attribute-input" @input="$emit('style-change', 'offsety', attributeInfo.id)">
                <div slot="suffix" class="attribute-input-label">Y</div>
              </el-input>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 10px;">
            <el-col :span="10">
              <el-input v-model="attributeInfo.width" class="attribute-input" @input="$emit('style-change', 'width', attributeInfo.id)">
                <div slot="suffix" class="attribute-input-label">宽</div>
              </el-input>
            </el-col>
            <el-col :span="10">
              <el-input v-model="attributeInfo.height" class="attribute-input" @input="$emit('style-change', 'height', attributeInfo.id)">
                <div slot="suffix" class="attribute-input-label">高</div>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备配置" name="config">
        <div class="attributes-block">
          <div class="attribute-item">
            <div class="attribute-item-label">设备型号：</div>
            <div class="attribute-item-control">
              <el-input v-model="attributeInfo.deviceModelName"/>
            </div>
          </div>
        </div>
        <div class="attributes-block">
          <div class="attribute-item">
            <div class="attribute-item-label">设备关联：</div>
            <div class="attribute-item-control">
              <el-select v-model="attributeInfo.deviceSn" placeholder="请选择">
                <el-option
                  v-for="item in deviceList"
                  :key="item.deviceSn"
                  :label="item.deviceName + '（' + item.deviceSn + '）'"
                  :value="item.deviceSn" />
              </el-select>
            </div>
          </div>
        </div>
        <div class="attributes-block">
          <div class="attribute-item">
            <div class="attribute-item-label" />
            <div class="attribute-item-control" style="text-align: right;">
              <el-button type="primary" size="medium" @click="handleClick">确定</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据图表" name="datagram">
        <div class="attribute-item">
          <div class="attribute-item-label">图表类型：</div>
          <div class="attribute-item-control">
            <el-select v-model="chartType" placeholder="请选择图表" @change="handleChange">
              <el-option
                v-for="item in chartList"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </div>
        </div>
        <div class="chart-container">
          <div id="chartdemo" class="chartdemo" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-show="panelType === 'connectInfo'" v-model="activeName2" type="card">
      <el-tab-pane label="阈值配置" name="connect">
        <el-form ref="form" :model="connectInfo" class="form-wrapper" label-width="60px">
          <el-form-item label="上报数据" label-width="80px">
            <el-select v-model="connectInfo.field" placeholder="请选择上报数据">
              <el-option v-for="item in connectInfo.fieldArray" :label="item.label" :value="item.field" :key="item.field"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="触发条件" label-width="80px">
            <el-select v-model="connectInfo.rule" placeholder="请选择触发条件">
              <el-option label="大于" value="greater"></el-option>
              <el-option label="小于" value="less"></el-option>
              <el-option label="等于" value="equal"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="阈值" label-width="80px">
              <el-input v-model="connectInfo.value" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label-width="80px">
              <el-button type="primary" @click="handleRelationship">确定</el-button>
            </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="脚本编辑" name="script">
        <div class="ace-wrapper">
          <div class="ace-title">
            <div>
              <span>编辑脚本</span>
              <el-tooltip placement="right" effect="light">
                <div slot="content">示例：<br/>function sensory(bytes){ ... }</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
            <span>javascript</span>
          </div>
          <ace></ace>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Message } from 'element-ui'
import { isDeviceOnline, postRelationship } from '@/api/device'
import { lineOption, barOption } from './chartOptions'
import ace from '@/components/CustomAce'

export default {
  components: {
    ace
  },
  props: {
    attributeInfo: {
      type: Object,
      default: function() {
        return {
          id: '',
          deviceModel: '',
          deviceModelName: '',
          unitName: '',
          unit: '',
          deviceSn: '',
          deviceName: '',
          online: false,
          data: '',
          ws: '',
          offsetx: 0,
          offsety: 0,
          width: 0,
          height: 0
        }
      }
    },
    panelType: {
      type: String,
      default: function() {
        return 'default'
      }
    },
    connectInfo: {
      type: Object,
      default: function() {
        return {
          id: '',
          from: {
            deviceModel: '',
            deviceSn: ''
          },
          to: {
            deviceModel: '',
            deviceSn: ''
          },
          fieldArray: [],
          field: '',
          rule: '',
          value: ''
        }
      }
    }
  },
  data() {
    return {
      activeName1: 'style',
      activeName2: 'connect',
      chartType: 'line',
      chartList: [
        { value: 'bar',
          label: '柱状图'
        },
        { value: 'line',
          label: '折线图'
        }
      ],
      myChart: null,
      myOption: null,
      currentId: '', // 标识当前选中设备模型
      currentLineId: '' // 标识当前选中连线
    }
  },
  computed: {
    deviceList() {
      return this.$store.getters.getDeviceList(this.attributeInfo.deviceModel)
    }
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('chartdemo'))
    this.myOption = JSON.parse(JSON.stringify(lineOption)) // 默认开启折线图
  },
  updated() {
    if (this.currentId !== this.attributeInfo.id) {
      this.currentId = this.attributeInfo.id
      this.activeName1 = 'style'
      this.chartType = 'line'
      this.myOption = JSON.parse(JSON.stringify(lineOption)) // 默认开启折线图
      this.myChart.clear()
    }

    if (this.currentLineId !== this.connectInfo.id) {
      this.currentLineId = this.connectInfo.id
      this.activeName2 = 'connect'
    }
  },
  methods: {
    handleClick() {
      var self = this
      if (this.attributeInfo.deviceSn == null || this.attributeInfo.deviceSn === '') {
        Message({
          message: '请先关联设备！',
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        this.$emit('saveDeviceModel', this.attributeInfo)

        isDeviceOnline([{ model: this.attributeInfo.deviceModel, sn: this.attributeInfo.deviceSn }]).then(res => {
          if (res && res.data) {
            const element = document.getElementById(self.attributeInfo.id)
            const src = element.firstChild.src
            let newsrc = src.replace('_off.png', '.png')
            let result = res.data.result[self.attributeInfo.deviceModel + ':' + self.attributeInfo.deviceSn]
            result = true // 演示状态统一改成 true，演示完毕再改回
            if (!result) {
              newsrc = newsrc.replace('.png', '_off.png')
            }
            if (newsrc.indexOf('fengshan') > 0) {
              newsrc = newsrc.replace('.png', '.gif')
            }
            element.firstChild.src = newsrc
            this.$store.commit('setDeviceModelListData', {
              id: this.attributeInfo.id,
              attr: 'online',
              data: result
            })
          }
        }).catch(() => {
          this.$store.commit('setDeviceModelListData', {
            id: this.attributeInfo.id,
            attr: 'online',
            data: false
          })
        })

        // 开启 websocket
        if (window.WebSocket) {
          if (this.attributeInfo.ws) {
            ws.close()
          }
          var ws = new WebSocket('ws://10.0.40.185:8888/socket/' + this.attributeInfo.deviceModel + '/' + this.attributeInfo.deviceSn)

          if (ws) {
            this.$store.commit('setWebSocket', {
              deviceModel: self.attributeInfo.deviceModel,
              deviceSn: self.attributeInfo.deviceSn,
              ws: ws
            })
            this.attributeInfo.ws = ws
          } else {
            return
          }

          ws.onopen = function() {
            // ws.send(self.attributeInfo.deviceModel + ' ' + self.attributeInfo.deviceSn)
            self.myChart.setOption(self.myOption) // 开启 websocket 以后，再展现图表
          }
          // let count = 0
          const deviceModelId = this.attributeInfo.id
          ws.onmessage = function(event) {
            const data = JSON.parse(event.data)
            const deviceModelInfo = self.$store.getters.getDeviceModelById(deviceModelId)
            const el = deviceModelInfo.el
            if (el) {
              // 改变数据
              self.$store.commit('setDeviceModelListData', {
                id: deviceModelInfo.id,
                attr: 'data',
                data: data
              })
              // 改变状态图
              const img = el.getElementsByTagName('img')
              if (img.length > 0) {
                let src = img[0].src
                if (deviceModelInfo.isAllOrNothing) {
                  src = src.replace('.gif', '.jpg')
                  if (deviceModelInfo.deviceModel === 'demo_sound') {
                    if (data > 15) {
                      src = src.replace('.jpg', '.gif')
                    }
                  } else {
                    src = src.replace('.jpg', '.gif')
                  }
                } else {
                  const oldData = deviceModelInfo.data
                  if (oldData) {
                    if (data < oldData) {
                      src = src.substring(0, src.lastIndexOf('/') + 1) + deviceModelInfo.deviceModel + '_down.gif'
                    } else if (data > oldData) {
                      src = src.substring(0, src.lastIndexOf('/') + 1) + deviceModelInfo.deviceModel + '_up.gif'
                    } else {
                      src = src.substring(0, src.lastIndexOf('/') + 1) + deviceModelInfo.deviceModel + '.jpg'
                    }
                  }
                }
                img[0].src = src
              }
            }

            if (deviceModelId === self.attributeInfo.id) {
              if (self.myOption.series[0].data.length > 30) {
                self.myOption.series[0].data.shift()
                const time = self.myOption.xAxis[0].data[self.myOption.xAxis[0].data.length - 1]
                self.myOption.xAxis[0].data.shift()
                self.myOption.xAxis[0].data.push(time + 1)
              }
              // count++
              self.myOption.series[0].name = self.attributeInfo.unitName
              // self.myOption.xAxis[0].data.push(count)
              self.myOption.series[0].data.push(data)
              self.myChart.setOption(self.myOption)
            }
          }
        }
        Message({
          message: '保存成功！',
          type: 'success',
          duration: 2 * 1000
        })
      }
    },
    handleChange(val) {
      // this.myOption.series[0].type = val
      switch (val) {
        case 'line':
          this.myOption = JSON.parse(JSON.stringify(lineOption))
          break
        case 'bar':
          this.myOption = JSON.parse(JSON.stringify(barOption))
          break
      }
      this.myChart.setOption(this.myOption)
    },
    handleRelationship() {
      const self = this
      const relationship = {
        'from': this.connectInfo.from,
        'to': this.connectInfo.to,
        'rule': this.connectInfo.rule,
        'value': this.connectInfo.value
      }
      postRelationship(relationship).then(() => {
        self.$store.commit('updateLine', {
          id: self.connectInfo.id,
          field: self.connectInfo.field,
          rule: self.connectInfo.rule,
          value: self.connectInfo.value
        })
        Message({
          message: '配置成功！',
          type: 'success',
          duration: 1 * 1000
        })
      }).catch(() => {
        Message({
          message: '配置失败！',
          type: 'error',
          duration: 1 * 1000
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.attributes-container {
  width: 340px;
  position: absolute;
  right: 15px;
  top: 55px;
  bottom: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  .attributes-block {
    width: 100%;
    padding: 10px;
    // border-bottom: 1px solid #dddddd;
  }
  .attribute-input {
    &-label {
      width: 20px;
      line-height: 40px;
      font-size: 16px;
    }
  }
  .attribute-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    &-label {
      width: 70px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
    }
    &-control {
      width: 200px;
    }
  }
  .chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  .chartdemo {
    width: 310px;
    height: 200px;
    border: 1px solid #CCCCCC;
  }
}
.form-wrapper {
  padding: 10px;
}
.ace-wrapper {
  margin: 0px 10px;
  border: 1px solid #dddddd;
  .ace-title {
    height: 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }
}
</style>
