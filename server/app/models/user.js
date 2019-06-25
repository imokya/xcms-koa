const { Schema, model } = require('mongoose')

const schema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String },
  pass: { type: String, select: false },
  avatar: { type: String, default: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif' },
  roles: [String],
  time: { type: Date, default: Date.now }
}, {
    versionKey: false
  })

module.exports = model('User', schema)