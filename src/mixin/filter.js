/**
 * 通用filter
 * @author fuchenen
 * @date 2019-6-18
 */
var filterMixin = {
  filters: {
    signTypeFilter(type) {
      const typeMap = {
        '1': '非对称加密',
        '2': '对称加密'
      }
      return typeMap[type]
    },
    appTypeFilter(type) {
      const typeMap = {
        '1': '设备接入应用',
        '2': '数据共享应用'
      }
      return typeMap[type]
    },
    platformTypeFilter(type) {
      const typeMap = {
        '1': '运维商平台',
        '2': '行业平台',
        '3': '8200平台'
      }
      return typeMap[type]
    },
    booleanFilter(boolean) {
      if (boolean) {
        return '是'
      } else {
        return '否'
      }
    },
    deviceModelStatusFilter(boolean) {
      if (boolean) {
        return '未发布'
      } else {
        return '已发布'
      }
    },
    netTypeFilter(type) {
      const typeMap = {
        '1': 'NB-IoT',
        '2': '蜂窝网络',
        '3': '以太网',
        '4': 'WIFI'
      }
      return typeMap[type]
    },
    pluginTypeFilter(type) {
      const typeMap = {
        '1': 'LWM2M',
        '2': 'MQTT',
        '3': 'ModBus',
        '4': 'HTTP',
        '5': 'overTCP'
      }
      return typeMap[type]
    },
    validTypeFilter(type) {
      const typeMap = {
        '11': 'imei',
        '12': 'urn:imei:############',
        '13': 'urn:imei:###############-###############',
        '21': '一机一密',
        '22': '一型一密',
        '111': 'sn'
      }
      return typeMap[type]
    },
    mesTypeFilter(type) {
      const typeMap = {
        'lv_bytes': 'lv_bytes格式',
        'json': 'JSON格式',
        'xml': 'XML格式',
        'script': 'Script格式'
      }
      return typeMap[type]
    },
    parseTypeFilter(type) {
      const typeMap = {
        '0': '设备协议模型',
        '1': '脚本插件'
      }
      return typeMap[type]
    },
    deviceTypeFilter(type) {
      const typeMap = {
        '0': '传感器设备',
        '1': '智能设备',
        '2': '网关设备',
        '3': '视频设备'
      }
      return typeMap[type]
    }
  }
}
export default filterMixin
