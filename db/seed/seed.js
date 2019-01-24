require('dotenv').config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI); 
const db = require("../models");
const seed = require("./lists.js");

createBooks = (books) => {
    console.log(books.length);
    for (let i = 0; i < books.length; i++) {
        const newBook = {
            title: books[i].title,
            authors: books[i].author,
            genre: books[i].genres,
            isbn: books[i].ISBN,
            pages: books[i].num_pages,
            language: books[i].language,
            summary: books[i].description,
            image: books[i].image
        };
    
        db.Book.create(newBook);
    };
}

addTags = (list, tag) => {
    const qry = { 
        tagName: tag
    };

    const opts = { 
        upsert: true, 
        new: true, 
        setDefaultsOnInsert: true 
    };

    db.Tag.findOneAndUpdate(qry, {$push: {lists: list._id }}, opts, (err, result) =>{
        if (!err) {
            if (!result) {
                result = new Tag({
                    tagName: tag
                });
            }
            result.save(err => {
                !err ? result.lists = [list._id] : err;
            });
        }
    }).then(tagRes => {
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
            addTags(listRes, list.tags[i]);

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

// createBooks(seed.books);

for (let i = 0; i < seed.lists.length; i++) {
    addLists(seed.lists[i]);
}

for (let i = 0; i < seed.books.length; i++) {
    addToList(seed.books[i]);
}

// seed.books.forEach(nBook => {
//     addToListOrCreate(nBook);
// });