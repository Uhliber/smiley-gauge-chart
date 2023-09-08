const gaugeNeedlePlugin = {
  id: 'gaugeNeedle',
  afterDatasetsDraw(chart) {
    const { ctx, data } = chart

    ctx.save()
    const xCenter = chart.getDatasetMeta(0).data[0].x
    const yCenter = chart.getDatasetMeta(0).data[0].y
    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius
    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius
    const widthSlice = (outerRadius - innerRadius) / 2
    const radius = 5
    const angle = Math.PI / 180

    const needleValue = data.datasets[0].needleValue

    const circumference =
      (chart.getDatasetMeta(0).data[0].circumference / Math.PI / data.datasets[0].data[0]) *
      needleValue

    ctx.translate(xCenter, yCenter)
    ctx.rotate(Math.PI * (circumference + 1.5))

    // needle
    ctx.beginPath()
    ctx.strokeStyle = '#c4c4c4'
    ctx.fillStyle = '#c4c4c4'
    ctx.lineWidth = 1
    ctx.moveTo(0 - radius, 0)
    ctx.lineTo(0, 0 - innerRadius - widthSlice + 15)
    ctx.lineTo(0 + radius, 0)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()

    // dot
    ctx.beginPath()
    ctx.arc(0, 0, 7, 0, angle * 360, false)
    ctx.fill()

    ctx.restore()
  }
}

export default gaugeNeedlePlugin