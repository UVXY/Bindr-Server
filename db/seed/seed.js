require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI); 
const db = require("../models");
const seed = require("./lists.js");


createBooks = (books) => {
    for (let i = 0; i < books.length; i++) {
        const newBook = {
            title: books[i].title,
            authors: books[i].author,
            genre: books[i].genres,
            isbn: books[i].ISBN,
            pages: books[i].num_pages,
            language: books[i].language,
            summary: books[i].description,
            image: books[i].image,
            infoLink: books[i].url
        };
        if (newBook.title === "The Giver") {
        console.log(newBook.summary)
        }
    
        //db.Book.create(newBook);
    };
}
createTags = (tags) => {
    for (let i = 0; i < tags.length; i++) {
        db.Tag.create({tagName: tags[i]});
    }
};

addTagsToList = (list, tag) => {
    const qry = { 
        tagName: tag
    };

    db.Tag.findOneAndUpdate(qry, {$push: {lists: list._id }}, {new: true}).then(tagRes => {
        db.List.findOneAndUpdate(
            {_id: list._id}, 
            {$push: {tags: tagRes._id }},
            {new: true}
        )
        .then(() => {
        });
    });

};

addLists = (list) => {

    const newList = {
        title: list.title
    };

    db.List.create(newList).then(listRes => {
        for (let i = 0; i <list.tags.length; i++) {
            addTagsToList(listRes, list.tags[i]);

        }
    });
};

addToList = (book) => {
    const qry = { 
        title: book.list 
    };

    const opts = { 
        upsert: false,
        new: true
    };

    db.Book.findOne({title: book.title})
    .then(bkRes => {
        db.List.findOneAndUpdate(qry, {$push: {books: bkRes._id }}, opts)
        .then(() => {})
    });
}

// createTags(seed.tags);

//createBooks(seed.books);

// for (let i = 0; i < seed.lists.length; i++) {
//     addLists(seed.lists[i]);
// }

// for (let i = 0; i < seed.books.length; i++) {
//     addToList(seed.books[i]);
// }

// seed.books.forEach(nBook => {
//     addToList(nBook);
// });

seed.sepLists.forEach(list => {
    const name = list[0].list;
    const length = list.length;
    console.log(`List ${name} is ${length} books long`);
});
