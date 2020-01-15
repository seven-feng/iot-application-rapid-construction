exports.lineOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  xAxis: [
    {
      name: '时\n间\n(s)',
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolSize: [6, 9],
        symbolOffset: [0, 10]
      },
      axisLabel: {
        show: true,
        interval: 9
      },
      data: (function() {
        let i = 31
        const result = []
        while (i--) {
          result.push(31 - i - 1)
        }
        return result
      })()
    }
  ],
  yAxis: [
    {
      type: 'value',
      // boundaryGap: ['10%', '10%'],
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolSize: [6, 9],
        symbolOffset: [0, 10]
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: true
      }
    }
  ],
  series: [
    {
      type: 'line',
      data: []
    }
  ]
}

exports.barOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: true,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      boundaryGap: ['10%', '10%'],
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: true
      }
    }
  ],
  series: [
    {
      type: 'bar',
      data: []
    }
  ]
}

// this.myOption = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'node',
//       label: {
//         backgroundColor: '#283b56'
//       }
//     }
//   },
//   xAxis: {
//     type: 'category',
//     axisLine: {
//       show: false
//     }
//   },
//   yAxis: {
//     type: 'value',
//     axisLine: {
//       show: true
//     },
//     axisTick: {
//       show: false
//     },
//     splitLine: {
//       show: false
//     },
//     axisLabel: {
//       show: false
//     }
//   },
//   series: [{
//     data: [820, 932, 901, 934, 290, 330, 320, 582, 666, 882],
//     type: 'line'
//   }]
// }
// this.myChart.setOption(this.myOption)

// setInterval(function() {
//   var data = self.myOption.series[0].data
//   data.shift()
//   data.push(Math.round(Math.random() * 1000))
//   self.myChart.setOption(self.myOption)
// }, 2000)

// var count = 0
// setInterval(function() {
//   var data0 = self.myOption.series[0].data
//   if (count > 10) {
//     data0.shift()
//   }
//   data0.push((Math.random() * 10 + 5).toFixed(1) - 0)
//   if (count > 10) {
//     self.myOption.xAxis[0].data.shift()
//   }
//   self.myOption.xAxis[0].data.push(count++)

//   self.myChart.setOption(self.myOption)
// }, 2000)
