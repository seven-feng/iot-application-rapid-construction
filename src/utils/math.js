/**
 * 三次贝塞尔曲线
 * @param {输出点坐标} outPortX
 * @param {输出点坐标} outPortY
 * @param {输入点坐标} inPortX
 * @param {输入点坐标} inPortY
 */

export function cubicBessel(outPortX, outPortY, inPortX, inPortY, isVertical, isTemp = false) {
  const BEZIER_CURVE_OFFSET1 = 2 // 画临时“连接线”时，由于<path>“内边距”原因，需要做一下特殊处理
  let BEZIER_CURVE_OFFSET2 = 20
  if (isVertical) {
    if (outPortY > inPortY) {
      const tempDistance = Math.abs(outPortY - inPortY)
      if (tempDistance < 20) {
        BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
      } else {
        BEZIER_CURVE_OFFSET2 = 20
      }
      if (isTemp) inPortY += BEZIER_CURVE_OFFSET1
      return `M ${outPortX} ${outPortY} C ${outPortX} ${(outPortY +
        inPortY) /
        2 -
        BEZIER_CURVE_OFFSET2} ${inPortX} ${(outPortY + inPortY) / 2 +
        BEZIER_CURVE_OFFSET2} ${inPortX} ${inPortY}`
    } else {
      const tempDistance = Math.abs(outPortY - inPortY)
      if (tempDistance < 20) {
        BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
      } else {
        BEZIER_CURVE_OFFSET2 = 20
      }
      if (isTemp) inPortY -= BEZIER_CURVE_OFFSET1
      return `M ${outPortX} ${outPortY} C ${outPortX} ${(outPortY +
        inPortY) /
        2 +
        BEZIER_CURVE_OFFSET2} ${inPortX} ${(outPortY + inPortY) / 2 -
        BEZIER_CURVE_OFFSET2} ${inPortX} ${inPortY}`
    }
  } else {
    if (outPortX > inPortX) {
      const tempDistance = Math.abs(outPortX - inPortX)
      if (tempDistance < 20) {
        BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
      } else {
        BEZIER_CURVE_OFFSET2 = 20
      }
      if (isTemp) inPortX += BEZIER_CURVE_OFFSET1
      return `M ${outPortX} ${outPortY} C ${(outPortX +
        inPortX) /
        2 -
        BEZIER_CURVE_OFFSET2} ${outPortY} ${(outPortX + inPortX) / 2 +
        BEZIER_CURVE_OFFSET2} ${inPortY} ${inPortX} ${inPortY}`
    } else {
      const tempDistance = Math.abs(outPortX - inPortX)
      if (tempDistance < 20) {
        BEZIER_CURVE_OFFSET2 = 20 + (20 - tempDistance) / 2
      } else {
        BEZIER_CURVE_OFFSET2 = 20
      }
      if (isTemp) inPortX -= BEZIER_CURVE_OFFSET1
      return `M ${outPortX} ${outPortY} C ${(outPortX +
        inPortX) /
        2 +
        BEZIER_CURVE_OFFSET2} ${outPortY} ${(outPortX + inPortX) / 2 -
        BEZIER_CURVE_OFFSET2} ${inPortY} ${inPortX} ${inPortY}`
    }
  }
}
