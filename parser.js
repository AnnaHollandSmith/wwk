const Papa = require('papaparse')
require('./speakers.csv')

Papa.parse('speakers.csv', {
  delimete: ',',
  header: true,
  skipEmptyLines: true,
  complete: function (results) {
    console.log(results)
  },
  error: function (error) {
    console.log(error)
  }
})
