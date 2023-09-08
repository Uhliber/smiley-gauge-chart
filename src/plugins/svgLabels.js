const svgLabelsPlugin = {
  id: 'svgLabels',
  afterDatasetsDraw: (chart, args, options) => {
    if (chart.config.type !== 'doughnut') return

    const { ctx, data } = chart
    const svgIcons = data.svgLabels

    // Loop through each dataset
    chart.data.datasets.forEach(function () {
      const meta = chart.getDatasetMeta(0)

      // Loop through each data element in the dataset
      meta.data.forEach(function (element, index) {
        const model = element

        // Calculate the angle of the segment's midpoint
        const angle = (model.startAngle + model.endAngle) / 2

        // Calculate the position for the SVG label
        const radius = (model.outerRadius + model.innerRadius) / 2
        const x = model.x + radius * Math.cos(angle)
        const y = model.y + radius * Math.sin(angle)

        // Replace 'YourSVG' with your SVG code
        const svgIcon = svgIcons[index]
        console.log(svgIcon.color);
        const svgEl = svgIcon.svg(svgIcon.color, 0)

        // Create a data URL for the SVG
        const svgData = 'data:image/svg+xml;base64,' + btoa(svgEl)

        // Create an image element and set its attributes
        const img = new Image()
        img.src = svgData
        img.onload = function () {
          // Draw the image on the canvas
          ctx.drawImage(img, x - img.width / 2, y - img.height / 2)
        }
      })
    })
  }
}

export default svgLabelsPlugin