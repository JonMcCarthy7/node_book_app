exports.seed = function(knex, Promise) {
  return knex("book")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("book").insert([
        {
          title: "A Game of Thrones",
          img_url:
            "https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg",
          description:
            "A Game of Thrones is the first novel in A Song of Ice and Fire, a series of fantasy novels by American author George R. R. Martin. It was first published on August 1, 1996. The novel won the 1997 Locus Award and was nominated for both the 1997 Nebula Award and the 1997 World Fantasy Award.",
          author_id: 1
        },
        {
          title: "The Fellowship of the Ring",
          img_url:
            "http://t1.gstatic.com/images?q=tbn:ANd9GcT5EDqHhGScR2g2rYX5Y2hvWJKwvF3siGwKmaVKX-AjWvF6_hQF",
          description:
            "The Fellowship of the Ring is the first of three volumes of the epic novel The Lord of the Rings by the English author J. R. R. Tolkien. It is followed by The Two Towers and The Return of the King. It takes place in the fictional universe of Middle-earth.",
          author_id: 2
        },
        {
          title: "The Hunger Games",
          img_url:
            "https://upload.wikimedia.org/wikipedia/en/3/39/The_Hunger_Games_cover.jpg",
          description:
            "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins. It is written in the voice of 16-year-old Katniss Everdeen, who lives in the future, post-apocalyptic nation of Panem in North America. The Capitol, a highly advanced metropolis, exercises political control over the rest of the nation.",
          author_id: 3
        }
      ]);
    });
};
