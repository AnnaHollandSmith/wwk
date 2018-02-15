const fs = require('fs')
const parse = require('csv-parse')

fs.readFile('./speakers2.csv', function (error, data) {
  if (error) {
    throw error
  }

  parse(data, { columns: true }, function (error, data) {
    if (error) {
      throw error
    }
    console.log(data)
  })
})
