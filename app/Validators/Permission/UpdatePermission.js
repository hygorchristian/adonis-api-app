'use strict'

class UpdatePermission {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      slug: '',
      name: '',
      description: ''
    }
  }
}

module.exports = UpdatePermission
