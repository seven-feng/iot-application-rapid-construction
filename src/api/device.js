import request from '@/utils/request'

export function isDeviceOnline(device) {
  return request({
    url: '/iot/platform/device/devsIfOnline',
    method: 'post',
    data: device
  })
}

export function getDeviceAttribute(deviceModelId) {
  return request({
    url: '/iot/platform/device/devAttr?deviceModelId=' + deviceModelId,
    method: 'get'
  })
}

export function postRelationship(relationship) {
  return request({
    url: '/service/relationships',
    method: 'post',
    data: relationship
  })
}
