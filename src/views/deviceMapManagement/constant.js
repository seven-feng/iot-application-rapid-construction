export const deviceModelList = [
  {
    deviceModel: 'demo_iravoid',
    cname: '红外传感器',
    deviceList: [
      {
        deviceModel: 'demo_iravoid',
        deviceSn: 'demo_iravoid_1',
        cname: '红外传感器',
        location: [120.018713, 30.281127]
      }
    ]
  },
  {
    deviceModel: 'demo_tmp',
    cname: '温度传感器',
    deviceList: [
      {
        deviceModel: 'demo_tmp',
        deviceSn: 'demo_tmp_1',
        cname: '树莓派温度传感器',
        location: [120.017368, 30.28025]
      }
    ]
  },
  {
    deviceModel: 'demo_pressure',
    cname: '压力传感器',
    deviceList: [
      {
        deviceModel: 'demo_pressure',
        deviceSn: 'demo_pressure_1',
        cname: '压力传感器',
        location: [120.016521, 30.280083]
      }
    ]
  },
  {
    deviceModel: 'demo_light',
    cname: '光敏传感器',
    deviceList: [
      {
        deviceModel: 'demo_light',
        deviceSn: 'demo_light_1',
        cname: '光敏传感器',
        location: [120.017615, 30.28095]
      }
    ]
  },
  {
    deviceModel: 'demo_smoke',
    cname: '烟雾传感器',
    deviceList: [
      {
        deviceModel: 'demo_smoke',
        deviceSn: 'demo_smoke_1',
        cname: '烟雾传感器',
        location: [120.016376, 30.281186]
      }
    ]
  },
  {
    deviceModel: 'demo_lamp',
    cname: '智能灯',
    deviceList: [
      {
        deviceModel: 'demo_lamp',
        deviceSn: 'demo_lamp_1',
        cname: '智能灯',
        location: [120.016896, 30.281992]
      }
    ]
  },
  {
    deviceModel: 'demo_video',
    cname: '摄像头',
    deviceList: [
      {
        deviceModel: 'demo_video',
        deviceSn: 'demo_video_1',
        cname: '摄像头',
        location: [120.015893, 30.282112]
      }
    ]
  },
  {
    deviceModel: 'demo_fan',
    cname: '电风扇',
    deviceList: [
      {
        deviceModel: 'demo_fan',
        deviceSn: 'demo_fan_1',
        cname: '电风扇',
        location: [120.017368, 30.282821]
      }
    ]
  }
]

export const styleOptions = [
  {
    value: '7a65cbe533522671222d57dfeb0bb877',
    name: '标准'
  },
  {
    value: 'dark',
    name: '幻影黑'
  },
  {
    value: 'light',
    name: '月光银'
  },
  {
    value: 'whitesmoke',
    name: '远山黛'
  },
  {
    value: 'fresh',
    name: '草色青'
  },
  {
    value: 'grey',
    name: '雅士灰'
  },
  {
    value: 'graffiti',
    name: '涂鸦'
  },
  {
    value: 'macaron',
    name: '马卡龙'
  },
  {
    value: 'blue',
    name: '靛青蓝'
  },
  {
    value: 'darkblue',
    name: '极夜蓝'
  },
  {
    value: 'wine',
    name: '酱籽'
  }
]
export const featureTypes = [
  {
    value: 'bg',
    name: '区域面'
  },
  {
    value: 'road',
    name: '道路'
  },
  {
    value: 'building',
    name: '建筑物'
  },
  {
    value: 'point',
    name: '标注'
  }
]
export function modelImagesFilter(val) {
  const modelImages = {
    demo_iravoid: 'wenduchuanganqi_off.png',
    demo_vibrate: 'zhendongchuanganqi_off.png',
    demo_rain: 'yudichuanganqi_off.png',
    demo_tilt: 'qingxiechuanganqi_off.png',
    demo_sound: 'shengyinchuanganqi_off.png'
  }
  return modelImages[val] ? `/static/assets/deviceModel/${modelImages[val]}` : ''
}

export function poiIconsFilter(val) {
  const poiIcons = {
    demo_iravoid: 'infrared',
    demo_fan: 'fan',
    demo_lamp: 'lamp',
    demo_light: 'light',
    demo_pressure: 'pressure',
    demo_smoke: 'smoke',
    demo_video: 'video'
  }
  return poiIcons[val] ? `/static/assets/map/${poiIcons[val]}.png` : '/static/assets/map/fan.png'
}

export const alarmList = [
  {
    id: 3781345,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-31 14:25:00',
    alarm: '离线报警',
    createTime: '2019-12-31 14:25:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781346,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_1',
    value: '2019-12-31 14:25:00',
    alarm: '离线报警',
    createTime: '2019-12-31 14:25:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781347,
    deviceModel: 'demo_iravoid',
    deviceModelName: '原型红外避障传感器',
    deviceSn: 'demo_iravoid_1',
    value: '2019-12-31 14:25:00',
    alarm: '离线报警',
    createTime: '2019-12-31 14:25:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781348,
    deviceModel: 'demo_light',
    deviceModelName: '原型光敏传感器',
    deviceSn: 'demo_light_1',
    value: '2019-12-31 14:25:00',
    alarm: '离线报警',
    createTime: '2019-12-31 14:25:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781349,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_3',
    value: '2019-12-31 14:25:00',
    alarm: '离线报警',
    createTime: '2019-12-31 14:25:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781340,
    deviceModel: 'demo_iravoid',
    deviceModelName: '原型红外避障传感器',
    deviceSn: 'demo_iravoid_1',
    value: '2019-12-31 11:38:00',
    alarm: '离线报警',
    createTime: '2019-12-31 11:38:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781341,
    deviceModel: 'demo_light',
    deviceModelName: '原型光敏传感器',
    deviceSn: 'demo_light_1',
    value: '2019-12-31 11:38:00',
    alarm: '离线报警',
    createTime: '2019-12-31 11:38:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781342,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-31 11:38:00',
    alarm: '离线报警',
    createTime: '2019-12-31 11:38:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781343,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_1',
    value: '2019-12-31 11:38:00',
    alarm: '离线报警',
    createTime: '2019-12-31 11:38:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781344,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_3',
    value: '2019-12-31 11:38:00',
    alarm: '离线报警',
    createTime: '2019-12-31 11:38:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781339,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-31 10:16:46',
    alarm: '离线报警',
    createTime: '2019-12-31 10:16:47',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781338,
    deviceModel: 'JWST_TCP_XML',
    deviceModelName: null,
    deviceSn: 'JWST_TCP_XML_001',
    value: '2019-12-25 10:51:00',
    alarm: '离线报警',
    createTime: '2019-12-25 10:51:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781337,
    deviceModel: 'JWST_TCP_XML',
    deviceModelName: null,
    deviceSn: 'JWST_TCP_XML_001',
    value: '2019-12-25 10:49:17',
    alarm: '离线报警',
    createTime: '2019-12-25 10:49:17',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781336,
    deviceModel: 'JWST_TCP_XML',
    deviceModelName: null,
    deviceSn: 'JWST_TCP_XML_001',
    value: '2019-12-25 10:41:53',
    alarm: '离线报警',
    createTime: '2019-12-25 10:41:53',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781330,
    deviceModel: 'demo_iravoid',
    deviceModelName: '原型红外避障传感器',
    deviceSn: 'demo_iravoid_1',
    value: '2019-12-19 20:04:22',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781331,
    deviceModel: 'demo_rain',
    deviceModelName: '原型雨滴传感器',
    deviceSn: 'demo_rain_1',
    value: '2019-12-19 19:59:13',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781332,
    deviceModel: 'demo_tilt',
    deviceModelName: '原型倾斜传感器',
    deviceSn: 'demo_tilt_1',
    value: '2019-12-19 19:59:13',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781333,
    deviceModel: 'demo_tmp',
    deviceModelName: '原型温度传感器',
    deviceSn: 'demo_tmp_1',
    value: '2019-12-19 19:59:13',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781334,
    deviceModel: 'demo_sound',
    deviceModelName: '原型声音传感器',
    deviceSn: 'demo_sound_1',
    value: '2019-12-19 19:59:13',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781335,
    deviceModel: 'demo_vibrate',
    deviceModelName: '原型震动传感器',
    deviceSn: 'demo_vibrate_1',
    value: '2019-12-19 19:59:20',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781329,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-19 20:04:00',
    alarm: '离线报警',
    createTime: '2019-12-19 20:19:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781328,
    deviceModel: 'broadcast',
    deviceModelName: '数字广播箱',
    deviceSn: 'bae8f50ad50457beae75eb2f4c311c0b',
    value: '2019-12-19 18:17:31',
    alarm: '离线报警',
    createTime: '2019-12-19 18:32:03',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781327,
    deviceModel: 'broadcast',
    deviceModelName: '数字广播箱',
    deviceSn: 'bae8f50ad50457beae75eb2f4c311c0b',
    value: '2019-12-19 18:16:33',
    alarm: '离线报警',
    createTime: '2019-12-19 18:32:02',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781325,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_3',
    value: '2019-12-19 16:21:05',
    alarm: '离线报警',
    createTime: '2019-12-19 16:21:05',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781326,
    deviceModel: 'demo_light',
    deviceModelName: '原型光敏传感器',
    deviceSn: 'demo_light_1',
    value: '2019-12-19 16:21:05',
    alarm: '离线报警',
    createTime: '2019-12-19 16:21:05',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781324,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_1',
    value: '2019-12-19 16:16:01',
    alarm: '离线报警',
    createTime: '2019-12-19 16:16:02',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781319,
    deviceModel: 'demo_rain',
    deviceModelName: '原型雨滴传感器',
    deviceSn: 'demo_rain_1',
    value: '2019-12-17 19:38:20',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781320,
    deviceModel: 'demo_vibrate',
    deviceModelName: '原型震动传感器',
    deviceSn: 'demo_vibrate_1',
    value: '2019-12-17 19:38:20',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781321,
    deviceModel: 'demo_tilt',
    deviceModelName: '原型倾斜传感器',
    deviceSn: 'demo_tilt_1',
    value: '2019-12-17 19:38:20',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781322,
    deviceModel: 'demo_tmp',
    deviceModelName: '原型温度传感器',
    deviceSn: 'demo_tmp_1',
    value: '2019-12-17 19:38:20',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781323,
    deviceModel: 'demo_sound',
    deviceModelName: '原型声音传感器',
    deviceSn: 'demo_sound_1',
    value: '2019-12-17 19:38:20',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:29',
    createUser: null,
    conditions: '离线时间大于600秒',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781314,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-17 19:43:00',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781315,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_1',
    value: '2019-12-17 19:43:00',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781316,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_3',
    value: '2019-12-17 19:43:00',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781317,
    deviceModel: 'demo_light',
    deviceModelName: '原型光敏传感器',
    deviceSn: 'demo_light_1',
    value: '2019-12-17 19:43:00',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781318,
    deviceModel: 'demo_iravoid',
    deviceModelName: '原型红外避障传感器',
    deviceSn: 'demo_iravoid_1',
    value: '2019-12-17 19:43:00',
    alarm: '离线报警',
    createTime: '2019-12-17 19:58:28',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781309,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_2',
    value: '2019-12-17 17:46:00',
    alarm: '离线报警',
    createTime: '2019-12-17 17:46:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781310,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_1',
    value: '2019-12-17 17:46:00',
    alarm: '离线报警',
    createTime: '2019-12-17 17:46:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781311,
    deviceModel: 'demo_relaypin',
    deviceModelName: '原型继电器',
    deviceSn: 'demo_relaypin_3',
    value: '2019-12-17 17:46:00',
    alarm: '离线报警',
    createTime: '2019-12-17 17:46:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  },
  {
    id: 3781312,
    deviceModel: 'demo_light',
    deviceModelName: '原型光敏传感器',
    deviceSn: 'demo_light_1',
    value: '2019-12-17 17:46:00',
    alarm: '离线报警',
    createTime: '2019-12-17 17:46:00',
    createUser: null,
    conditions: '设备主动离线',
    indexCode: 'offline',
    alarmLevel: 0,
    alarmCode: 1
  }
]
