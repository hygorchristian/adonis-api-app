'use strict'

class Auth {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required',
      password: 'required'
    }
  }
}

module.exports = Auth
