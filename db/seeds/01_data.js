exports.seed = function(knex, Promise) {
  return knex("author")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("author").insert([
        {
          name: "George R. R. Martin",
          bio:
            "George Raymond Richard Martin, also known as GRRM, is an American novelist and short-story writer in the fantasy, horror, and science fiction genres, screenwriter, and television producer."
        },
        {
          name: "J. R. R. Tolkien",
          bio:
            "John Ronald Reuel Tolkien, CBE FRSL was an English writer, poet, philologist, and university professor who is best known as the author of the classic high fantasy works The Hobbit, The Lord of the Rings, and The Silmarillion."
        },
        {
          name: "Suzanne Collins",
          bio:
            "Suzanne Collins is an American television writer and author, best known as the author of The New York Times best selling series The Underland Chronicles and The Hunger Games trilogy. "
        }
      ]);
    });
};
