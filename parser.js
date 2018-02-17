require('dotenv').config()
const fs = require('fs')
const parse = require('csv-parse')
const mongojs = require('mongojs')
const db = mongojs(process.env.DB_URL)
const people = db.collection('people')

fs.readFile('./speakers2.csv', function (error, data) {
  if (error) {
    throw error
  }

  parse(data, { columns: true }, function (error, data) {
    if (error) {
      throw error
    }

    data.forEach(function (person) {
      for (field in person) {
        if (person[field] && typeof person[field] === 'string') {
          person[field] = person[field].trim()
        }

        if (field === 'twitter') {
          person['twitter'] = person['twitter'].replace('@', '')
        }

        if (field === 'interests') {
          person['interests'] = person['interests'].split(/[.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
            .map(interest => interest.trim())
            .filter(interest => interest)
        }

        if (field === 'skills') {
          person['skills'] = person['skills'].split(/[.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
          .map(skill => skill.trim())
          .filter(skill => skill)
        }

        if (field === 'industries') {
          person['industries'] = person['industries'].split(/[.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
          .map(industry => industry.trim())
          .filter(industry => industry)
        }

        if (field === 'companies') {
          person['companies'] = person['companies'].split(/[.:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
          .map(company => company.trim())
          .filter(company => company)
        }
      }

      people.findOne({ firstName: data.firstName, lastName: data.lastName }, function (error, doc) {
        if (error) {
          throw new Error(error)
        }

        if (doc) {
          console.log('Omitting record - possible duplicate - add manually')
          return console.log(person)
        }
  
        people.insert(data)
      })
    })

  })
})
