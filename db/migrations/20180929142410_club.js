exports.up = function(knex, Promise) {
  return knex.schema.createTable("club", function(table) {
    table.increments("id").primary();
    table.string("name");
    table.text("description");
    table.text("img_url");
    table
      .integer("book_id")
      .references("book.id")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("club");
};
