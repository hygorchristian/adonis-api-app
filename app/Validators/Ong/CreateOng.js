'use strict'

class CreateOng {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      slug: 'required',
      name: 'required',
      description: 'required',
      birth: 'required',
    }
  }
}

module.exports = CreateOng
