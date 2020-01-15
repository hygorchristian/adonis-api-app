'use strict'

class UpdateRole {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      slug: '', 
      name: '', 
      description: '', 
    }
  }
}

module.exports = UpdateRole
