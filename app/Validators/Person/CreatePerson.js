'use strict'

class CreatePerson {
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

module.exports = CreatePerson
