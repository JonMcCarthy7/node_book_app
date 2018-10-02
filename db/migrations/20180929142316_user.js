exports.up = function(knex, Promise) {
  return knex.schema.createTable("user", table => {
    table.increments();
    table.string("first_name");
    table.string("last_name");
    table.string("user_name");
    table.string("email").unique();
    table.string("password");
    table.string("role");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user");
};
