const svgLabelsPlugin = {
  id: 'svgLabels',
  afterDatasetsDraw: (chart, args, options) => {
    if (chart.config.type !== 'doughnut') return

    const { ctx, data } = chart
    const labels = data.labels
    const svgIcons = data.svgLabels
    const highlightedSvgLabel = data.datasets[0].highlightedSvgLabel;
    const showLabels = !!data.datasets[0].showLabels;

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

        const svgIcon = svgIcons[index]
        const isHiglighted = highlightedSvgLabel === index;
        const svgEl = svgIcon.svg(svgIcon.color, isHiglighted ? 0.5 : 0, isHiglighted ? 35 : 30)

        // Create a data URL for the SVG
        const svgData = 'data:image/svg+xml;base64,' + btoa(svgEl)

        // Create an image element and set its attributes
        const img = new Image()
        img.src = svgData
        img.onload = function () {
          // Draw the image on the canvas
          ctx.drawImage(img, x - img.width / 2, y - img.height / 2)

          if (!showLabels) {
            return
          }

          if (isHiglighted) {
            ctx.font = "bold 9px Arial";
          } else {
            ctx.font = "8px Arial";
          }
          ctx.fillStyle = svgIcon.color; // Set the text color
          ctx.textAlign = "center"; // Center the text horizontally

          // Calculate the position for the text
          var textX = x; // X-coordinate same as the image
          var textY = y + img.height / 2 + 7; // Adjust the Y-coordinate as needed

          // Draw the text on the canvas
          ctx.fillText(labels[index].toUpperCase(), textX, textY);
        }
      })
    })
  }
}

export default svgLabelsPlugin