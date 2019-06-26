const { Schema, model } = require('mongoose')

const schema = new Schema({
  __v: { type: Number, select: false },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, required: true },
  feature: { type: String, default: '' },
  summary: { type: String, default: '' },
  time: { type: Date, default: Date.now }
}, {
    versionKey: false
  })

module.exports = model('Article', schema)