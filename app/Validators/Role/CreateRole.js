'use strict'

class CreateRole {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      slug: 'required',
      name: 'required',
      description: 'required'
    }
  }
}

module.exports = CreateRole
