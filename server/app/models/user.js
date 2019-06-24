const { Schema, model } = require('mongoose')

const schema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String },
  pass: { type: String, select: false },
  roles: [String]
}, {
    versionKey: false
  })

module.exports = model('User', schema)