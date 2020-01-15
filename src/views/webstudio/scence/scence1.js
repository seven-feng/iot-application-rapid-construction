const models = [
  {
    id: 'demo_iravoid-648355',
    deviceModelId: '020415756189400000004942',
    deviceModel: 'demo_iravoid',
    deviceModelName: '红外传感器',
    unitName: '',
    unit: '',
    img: 'hongwaichuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_iravoid',
        deviceSn: 'demo_iravoid_1',
        deviceName: '树莓派红外传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '50',
    offsetY: '100'
  },
  {
    id: 'demo_lamp-996354',
    deviceModelId: '020415759583900000000297',
    deviceModel: 'demo_lamp',
    deviceModelName: '智能灯',
    unitName: '',
    unit: '',
    img: 'dengguangkongzhiqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_lamp',
        deviceSn: 'demo_lamp_1',
        deviceName: '智能灯',
        data: '',
        ws: ''
      }
    ],
    offsetX: '340',
    offsetY: '120'
  },
  {
    id: 'demo_tmp-332623',
    deviceModelId: '020415730024540000000202',
    deviceModel: 'demo_tmp',
    deviceModelName: '温度传感器',
    unitName: '温度',
    unit: '℃',
    img: 'wenduchuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_tmp',
        deviceSn: 'demo_tmp_1',
        deviceName: '树莓派温度传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '400',
    offsetY: '300'
  },
  {
    id: 'demo_fan-994462',
    deviceModelId: '020415759584660000001550',
    deviceModel: 'demo_fan',
    deviceModelName: '风扇',
    unitName: '',
    unit: '',
    img: 'fengshan_off.png',
    deviceList: [
      {
        deviceModel: 'demo_fan',
        deviceSn: 'demo_fan_1',
        deviceName: '树莓派风扇',
        data: '',
        ws: ''
      }
    ],
    offsetX: '800',
    offsetY: '250'
  },
  {
    id: 'demo_pressure-115426',
    deviceModelId: '020415756010070000001918',
    deviceModel: 'demo_pressure',
    deviceModelName: '压力传感器',
    unitName: '',
    unit: '',
    img: 'yalichuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_pressure',
        deviceSn: 'demo_pressure_1',
        deviceName: '树莓派压力传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '200',
    offsetY: '500'
  },
  {
    id: 'demo_lamp-663851',
    deviceModelId: '020415759583900000000297',
    deviceModel: 'demo_lamp',
    deviceModelName: '智能灯',
    unitName: '',
    unit: '',
    img: 'dengguangkongzhiqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_lamp',
        deviceSn: 'demo_lamp_1',
        deviceName: '智能灯',
        data: '',
        ws: ''
      }
    ],
    offsetX: '600',
    offsetY: '450'
  },
  {
    id: 'demo_light-778932',
    deviceModelId: '020415756124590000002378',
    deviceModel: 'demo_light',
    deviceModelName: '光敏传感器',
    unitName: '',
    unit: '',
    img: 'guangminchuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_light',
        deviceSn: 'demo_light_1',
        deviceName: '树莓派光敏传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '400',
    offsetY: '630'
  },
  {
    id: 'demo_lamp-600892',
    deviceModelId: '020415759583900000000297',
    deviceModel: 'demo_lamp',
    deviceModelName: '智能灯',
    unitName: '',
    unit: '',
    img: 'dengguangkongzhiqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_lamp',
        deviceSn: 'demo_lamp_1',
        deviceName: '智能灯',
        data: '',
        ws: ''
      }
    ],
    offsetX: '800',
    offsetY: '600'
  }
]

const lines = [
  {
    id: 'line-486454',
    from: 'demo_iravoid-648355',
    to: 'demo_lamp-996354'
  },
  {
    id: 'line-964435',
    from: 'demo_tmp-332623',
    to: 'demo_fan-994462'
  },
  {
    id: 'line-0198742',
    from: 'demo_pressure-115426',
    to: 'demo_lamp-663851'
  },
  {
    id: 'line-324230',
    from: 'demo_light-778932',
    to: 'demo_lamp-600892'
  }
]

module.exports = {
  models,
  lines
}
