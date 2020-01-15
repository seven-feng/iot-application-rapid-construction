const device = {
  state: {
    deviceModelList: [], // 当前工作台上展示的设备模型列表
    // {
    //   id,
    //   deviceModelId,
    //   deviceModel,
    //   deviceModelName,
    //   unitName,
    //   unit,
    //   deviceSn,
    //   deviceName,
    //   online,
    //   data,
    //   ws,
    //   width,
    //   height,
    //   offsetx,
    //   offsety
    // }
    deviceModelData: [], // 左边栏提供选择的设备模型列表
    // {
    //   deviceModelId,
    //   deviceModel,
    //   deviceModelName,
    //   unitName,
    //   unit,
    //   img,
    //   deviceList
    // }
    sensingDeviceData: [], // 左边栏提供选择的感知设备列表
    // {
    //   deviceModelId,
    //   deviceModel,
    //   deviceModelName,
    //   unitName,
    //   unit,
    //   img,
    //   deviceList
    // }
    chargedDeviceData: [], // 左边栏提供选择的被控设备列表
    // {
    //   deviceModelId,
    //   deviceModel,
    //   deviceModelName,
    //   unitName,
    //   unit,
    //   img,
    //   deviceList
    // }
    lineList: [] // 设备模型连线列表
    // id,
    // from,
    // to,
    // field,
    // rule,
    // value
  },
  getters: {
    getDeviceModelById: state => id => {
      return state.deviceModelList.find(item => item.id === id)
    },
    getDeviceModelIdFromLine: state => (lineId, device) => {
      let deviceId = ''
      for (let i = 0; i < state.lineList.length; i++) {
        if (state.lineList[i].id === lineId) {
          deviceId = state.lineList[i][device]
          break
        }
      }
      for (let i = 0; i < state.deviceModelList.length; i++) {
        if (state.deviceModelList[i].id === deviceId) {
          return state.deviceModelList[i].deviceModelId
        }
      }
    },
    getDeviceList: state => deviceModel => {
      for (let i = 0; i < state.deviceModelData.length; i++) {
        if (state.deviceModelData[i].deviceModel === deviceModel) {
          return state.deviceModelData[i].deviceList
        }
      }
    },
    getLineById: state => (id) => {
      return state.lineList.find(item => item.id === id)
    }
  },
  mutations: {
    addDeviceModel(state, deviceModel) {
      state.deviceModelList.push(deviceModel)
    },
    removeDeviceModelListItem(state, id) {
      for (let i = 0; i < state.deviceModelList.length; i++) {
        if (state.deviceModelList[i].id === id) {
          state.deviceModelList.splice(i, 1)
          break
        }
      }
    },
    clearDeviceModelList(state) {
      state.deviceModelList = []
    },
    addDeviceModelEl(state, payload) {
      state.deviceModelList[payload.index].el = payload.el
    },
    addDeviceModelLine(state, payload) {
      if (!state.deviceModelList[payload.index][payload.attr]) {
        state.deviceModelList[payload.index][payload.attr] = []
        state.deviceModelList[payload.index][payload.attr].push(payload.lineId)
      }
    },
    updateElXY(state, payload) {
      state.deviceModelList[payload.index].el.style.left = payload.left + 60 + 'px'
      state.deviceModelList[payload.index].el.style.top = payload.top - 10 + 'px'
    },
    removeDeviceModelEl(state, id) {
      for (let i = 0; i < state.deviceModelList.length; i++) {
        if (state.deviceModelList[i].id === id) {
          state.deviceModelList[i].el = null
        }
      }
    },
    setDeviceModelListData(state, payload) {
      for (let i = 0; i < state.deviceModelList.length; i++) {
        if (state.deviceModelList[i].id === payload.id) {
          state.deviceModelList[i][payload.attr] = payload.data
          // state.deviceModelList.splice(i, 1, Object.assign({}, state.deviceModelList[i], {
          //   [payload.attr]: payload.data
          // }))
        }
      }
    },
    setWebSocket(state, payload) {
      for (let i = 0; i < state.deviceModelList.length; i++) {
        if (state.deviceModelList[i].deviceModel === payload.deviceModel && state.deviceModelList[i].deviceSn === payload.deviceSn) {
          state.deviceModelList[i].ws = payload.ws
          break
        }
      }
    },
    addLine(state, payload) {
      state.lineList.push(payload)
    },
    updateLine(state, payload) {
      for (let i = 0; i < state.lineList.length; i++) {
        if (state.lineList[i].id === payload.id) {
          state.lineList[i].field = payload.field
          state.lineList[i].rule = payload.rule
          state.lineList[i].value = payload.value
        }
      }
    },
    removeLine(state, index) {
      state.lineList.splice(index, 1)
    },
    // 左边栏提供选择的设备模型列表
    setDeviceModelData(state, deviceModelData) {
      state.deviceModelData = state.deviceModelData.concat(deviceModelData)
    },
    addDeviceModelData(state, deviceModel) {
      state.deviceModelData.push(deviceModel)
    },
    clearDeviceModelData(state) {
      state.deviceModelData = []
    },
    // 左边栏提供选择的感知设备列表
    setSensingDeviceData(state, sensingDeviceData) {
      state.sensingDeviceData = sensingDeviceData
    },
    addSensingDeviceData(state, sensingDevice) {
      state.sensingDeviceData.push(sensingDevice)
    },
    clearSensingDeviceData(state) {
      state.sensingDeviceData = []
    },
    // 左边栏提供选择的被控设备列表
    setChargedDeviceData(state, chargedDeviceData) {
      state.chargedDeviceData = chargedDeviceData
    },
    addChargedDeviceData(state, chargedDevice) {
      state.chargedDeviceData.push(chargedDevice)
    },
    clearChargedDeviceData(state) {
      state.chargedDeviceData = []
    }
  }
}

export default device
