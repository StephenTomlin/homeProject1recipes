
exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTableIfNotExists('users', function(table){
    table.increments('userid');
    table.string('username');
    table.string('passwordhash');
  })
])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
