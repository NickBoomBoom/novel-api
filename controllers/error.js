class ResponseError {
  constructor(data, code, msg) {
    this.result = {
      data: data,
      code: code || 200,
      msg: msg,
    }
  }
}