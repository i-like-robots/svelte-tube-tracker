function homeView({ app, initialData }) {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>TfL London Underground Arrivals</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="app">${app}</div>
        <script type="application/json" id="initialData">
          ${JSON.stringify(initialData)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
}

module.exports = homeView
