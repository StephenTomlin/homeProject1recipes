exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTableIfNotExists('favourites', function(table){
      table.increments('id');
      table.string('fav_recipe');
  })
])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favourites')
  ])
};
