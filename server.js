const app = require('./src/index')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})