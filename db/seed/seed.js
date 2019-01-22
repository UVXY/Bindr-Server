const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bindr"); 
const db = require("../models");
const books = require("./lists.json");

console.log(books.length);

addToList = (book) => {
    const qry = { 
        title: book.list 
    };
    const updt = { 
        $push: {books: bookRes._id }
    };
    const opts = { 
        upsert: true, 
        new: true, 
        setDefaultsOnInsert: true 
    };

    const newBook = {
        title: book.title,
        authors: book.author,
        genre: book.genres
    };
    db.Book.create(newBook).then(bookRes => {
        db.List.findOneAndUpdate(qry, updt, opts, (err, result) =>{
            if (!err) {
                if (!result) {
                    result = new List({
                        title: book.list
                    });
                }
                result.save(err => {
                    !err ? result.books = [bookRes._id] : err;
                });
            }
        });
    });
}

books.forEach(nBook => {
    addToList(nBook);
});