import request from '@/utils/request'

// 获取行业列表（扁平结构，包含启用、禁用，支持异步加载）
export function getAllTradeList(pageNum = 1, pageSize = 50, parentCode = '0') {
  return request({
    url: '/iot/platform/tradeDic/listAll',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      parentCode
    }
  })
}
// 获取行业的树型结构（全部数据）
export function getTradeTree(includeDisabled = false) {
  return request({
    url: '/iot/platform/tradeDic/treeList',
    method: 'get',
    params: {
      includeDisabled
    }
  })
}
// 获取行业列表（树型结构，只含启用的，支持异步加载）
export function getTradeList(pageNum = 1, pageSize = 50, parentCode = '0') {
  return request({
    url: '/iot/platform/tradeDic/list',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      parentCode
    }
  })
}
// 获取行业列表（非树型结构，层级展开，只含启用的）
export function getTradeListOnServe(pageNum = 1, pageSize = 50) {
  return request({
    url: '/iot/platform/tradeDic/allNameCode',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
// 行业新增
export function addTrade(trade) {
  return request({
    url: '/iot/platform/tradeDic/add',
    method: 'post',
    data: {
      name: trade.name,
      code: trade.code
    }
  })
}
// 行业启用
export function unDisabledTrade(tradeCode) {
  return request({
    url: '/iot/platform/tradeDic/unDisabled/' + tradeCode,
    method: 'put'
  })
}
// 行业禁用
export function disabledTrade(tradeCode) {
  return request({
    url: '/iot/platform/tradeDic/disabled/' + tradeCode,
    method: 'put'
  })
}
// 获取设备类别列表（扁平结构，包含启用、禁用，支持异步加载）
export function getDeviceCategoryListAll(pageNum = 1, pageSize = 50, parentCode = '0') {
  return request({
    url: '/iot/platform/devCatDic/listAll',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      parentCode
    }
  })
}
// 获取设备类别的树型结构（全部数据）
export function getDeviceCategoryTree(includeDisabled = false) {
  return request({
    url: '/iot/platform/devCatDic/treeList',
    method: 'get',
    params: {
      includeDisabled
    }
  })
}
// 获取设备类别列表（树型结构，只含启用的，支持异步加载）
export function getDeviceCategoryList(pageNum = 1, pageSize = 50, parentCode = '0') {
  return request({
    url: '/iot/platform/devCatDic/list',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      parentCode
    }
  })
}
// 获取设备类别（扁平结构，层级展开，只含启用的）
export function getDeviceCategoryListOnServe(pageNum = 1, pageSize = 50) {
  return request({
    url: '/iot/platform/devCatDic/allNameCode',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
// 设备类别新增
export function addDeviceCategory(deviceType) {
  return request({
    url: '/iot/platform/devCatDic/add',
    data: {
      name: deviceType.name,
      code: deviceType.code
    }
  })
}
// 设备类别禁用
export function disabledCategory(code) {
  return request({
    url: '/iot/platform/devCatDic/disabled/' + code,
    method: 'put'
  })
}
// 设备类别启用
export function unDisableCategory(code) {
  return request({
    url: '/iot/platform/devCatDic/unDisabled/' + code,
    method: 'put'
  })
}
// 设备类别和行业前端提取名称(设备型号页面专用)
const filterName = (list, categoryOpts, tradeOpts) => {
  if (list && list.length) {
    list.forEach(item => {
      const categoryOption = categoryOpts.find((v, i) => { return v.code === item['deviceCategoryCode'] }) || ''
      if (categoryOption !== '')item['deviceCategory'] = categoryOption.name
      const tradeOption = tradeOpts.find((v, i) => { return v.code === item['tradeCode'] }) || ''
      if (tradeOption !== '') item['trade'] = tradeOption.name
    })
  }
  return list
}
export { filterName }
