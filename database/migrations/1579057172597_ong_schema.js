'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OngSchema extends Schema {
  up () {
    this.create('ongs', (table) => {
      table.increments()
      
      table.string('slug') 
      table.string('name') 
      table.text('description') 
      table.date('birth') 

      table.timestamps()
    })
  }

  down () {
    this.drop('ongs')
  }
}

module.exports = OngSchema
