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
    id: 'demo_smoke-771156',
    deviceModelId: '020415756125780000003035',
    deviceModel: 'demo_smoke',
    deviceModelName: '烟雾传感器',
    unitName: '',
    unit: '',
    img: 'yanwuchuanganqi_off.png',
    deviceList: [
      {
        deviceModel: 'demo_smoke',
        deviceSn: 'demo_smoke_1',
        deviceName: '烟雾传感器',
        data: '',
        ws: ''
      }
    ],
    offsetX: '300',
    offsetY: '500'
  },
  {
    id: 'demo_video-993667',
    deviceModelId: '020415361111460000011273',
    deviceModel: 'demo_video',
    deviceModelName: '摄像头',
    unitName: '',
    unit: '',
    img: 'shexiangtou_off.png',
    deviceList: [
      {
        deviceModel: 'demo_video',
        deviceSn: 'demo_video_1',
        deviceName: '摄像头',
        data: '',
        ws: ''
      }
    ],
    offsetX: '700',
    offsetY: '430'
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
    from: 'demo_smoke-771156',
    to: 'demo_video-993667'
  }
]

module.exports = {
  models,
  lines
}
