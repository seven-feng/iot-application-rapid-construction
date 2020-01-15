const models = [
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
    offsetX: '200',
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
    offsetX: '540',
    offsetY: '120'
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
    offsetY: '330'
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
    offsetX: '800',
    offsetY: '350'
  },
  {
    id: 'demo_sound-614934',
    deviceModelId: '020415730032770000001413',
    deviceModel: 'demo_sound',
    deviceModelName: '声音传感器',
    unitName: '音量',
    unit: '',
    img: 'shengyinchuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_sound',
        deviceSn: 'demo_sound_1',
        deviceName: '树莓派声音传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '300',
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
    offsetX: '600',
    offsetY: '600'
  }
]

const lines = [
  {
    id: 'line-486454',
    from: 'demo_tmp-332623',
    to: 'demo_lamp-996354'
  },
  {
    id: 'line-964435',
    from: 'demo_light-778932',
    to: 'demo_lamp-663851'
  },
  {
    id: 'line-964823',
    from: 'demo_sound-614934',
    to: 'demo_lamp-600892'
  }
]

module.exports = {
  models,
  lines
}
