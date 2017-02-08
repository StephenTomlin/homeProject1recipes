exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.createTableIfNotExists('favourites', function(table){
        table.integer('id');
        table.string('fav_recipe');
    }),
    knex.schema.createTableIfNotExists('fridge', function(table){
        table.integer('id');
        table.string('ingredients');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('favourites'),
    knex.schema.dropTable('fridge')
  ])
};
