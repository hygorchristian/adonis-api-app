'use strict'

class CreateImage {
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

module.exports = CreateImage
