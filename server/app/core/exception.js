class Exception extends Error {
  constructor(msg = '出错啦', status = 400, code = 20000) {
    super()
    this.msg = msg
    this.code = code
    this.status = status
  }
}

module.exports = {
  Exception
}