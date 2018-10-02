exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("author", function(table) {
      table.increments("id").primary();
      table.string("name");
      table.text("bio");
      table.text("img_url");
      table.timestamps(true, true);
    }),
    knex.schema.createTable("book", function(table) {
      table.increments("id").primary();
      table.string("title");
      table.text("img_url");
      table.text("description");
      table.string("genre");
      table
        .integer("author_id")
        .references("author.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("book"),
    knex.schema.dropTable("author")
  ]);
};
