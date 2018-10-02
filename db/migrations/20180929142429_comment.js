exports.up = function(knex, Promise) {
  return knex.schema.createTable("comment", function(table) {
    table.increments("id").primary();
    table.text("content");
    table.string("commenter");
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
  return knex.schema.dropTable("comment");
};
