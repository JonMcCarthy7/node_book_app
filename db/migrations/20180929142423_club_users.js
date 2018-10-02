exports.up = function(knex, Promise) {
  return knex.schema.createTable("club_users", function(table) {
    table.increments("id").primary();
    table
      .integer("user_id")
      .references("user.id")
      .onDelete("CASCADE");
    table
      .integer("club_id")
      .references("club.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("club_users");
};
