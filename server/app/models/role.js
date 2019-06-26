const { Schema, model } = require('mongoose')

const schema = new Schema({
  __v: { type: Number, select: false },
  key: { type: String },
  name: { type: String },
  description: { type: String, default: '' },
  routes: []
}, {
    versionKey: false
  })

module.exports = model('Role', schema)