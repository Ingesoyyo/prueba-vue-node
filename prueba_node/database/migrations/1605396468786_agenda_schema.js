'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendaSchema extends Schema {
  up () {
    this.create('agenda', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('agenda')
      table.string('name', 255).notNullable().index()
      table.string('last_name', 80).notNullable()
      table.integer('phone_number', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('agenda')
  }
}

module.exports = AgendaSchema
