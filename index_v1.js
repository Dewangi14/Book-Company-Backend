// MAIN BACKEND FILE

const db = require("./database/index.js");

const express = require("express");

const app = express();
app.use(express.json());


// APIs


              // GET APIs

//http://localhost:3000/

app.get("/", (req,res) => {
    return res.json({"WELCOME": `to my Backend Software for the Company`});
});

// BOOKS 

//http://localhost:3000/books

app.get("/books", (req,res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});


//http://localhost:3000/book-isbn/12345Two

app.get("/book-isbn/:isbn", (req,res) => {
    const {isbn} = req.params;
    const getSpecificBook = db.books.filter((book) => book.ISBN === isbn);
    if (getSpecificBook.length === 0) {
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook[0]);
});


//http://localhost:3000/book-category/programming

app.get("/book-category/:category", (req,res) => {
    const {category} = req.params;
    const getSpecificBook = db.books.filter((book) => book.category.includes(category));
    if (getSpecificBook.length === 0) {
        return res.json({"error": `No book found for the category of ${category}`});
    }
    return res.json(getSpecificBook);
});


// AUTHORS

//http://localhost:3000/authors

app.get("/authors", (req,res) => {
    const getAllAuthors = db.authors;
    return res.json(getAllAuthors);
});


//http://localhost:3000/author-id/1

app.get("/author-id/:id", (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthor = db.authors.filter((author) => author.id === id);
    if (getSpecificAuthor.length === 0) {
        return res.json({"error": `No author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
});

//http://localhost:3000/author-isbn/12345Two

app.get("/author-isbn/:isbn", (req,res) => {
    const {isbn} = req.params;
    const getSpecificAuthor = db.authors.filter((author) => author.books.includes(isbn));
    if (getSpecificAuthor.length === 0) {
        return res.json({"error": `No author found for the book isbn of ${isbn}`});
    }
    return res.json(getSpecificAuthor);
});


// PUBLICATIONS

//http://localhost:3000/publications

app.get("/publications", (req,res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});


//http://localhost:3000/publication-isbn/12345Two

app.get("/publication-isbn/:isbn", (req,res) => {
    const {isbn} = req.params;
    const getSpecificPublication = db.publications.filter((publication) => publication.books.includes(isbn));
    if (getSpecificPublication.length === 0) {
        return res.json({"error": `No publication found for the book isbn of ${isbn}`});
    }
    return res.json(getSpecificPublication);
});


// POST APIs


// 1. To add a new book to database

//http://localhost:3000/book


app.post("/book", (req,res) => {

    db.books.push(req.body);
    return res.json(db.books);
});


// 2. To add a new author to database

//http://localhost:3000/author


app.post("/author", (req,res) => {

    db.authors.push(req.body);
    return res.json(db.authors);
});


// 3. To add a new publication to database

//http://localhost:3000/publication


app.post("/publication", (req,res) => {

    db.publications.push(req.body);
    return res.json(db.publications);
});


         // PUT APIs


// 1. To update a book based on ISBN in the database

//http://localhost:3000/book-update/12345ONE


app.put("/book-update/:isbn", (req,res) => {

    const {isbn} = req.params;
    db.books.forEach((book) => {
        if (book.ISBN === isbn) {
            //console.log({...book, ...req.body})
            return {...book, ...req.body}
        }
        return book;
    })
    return res.json(db.books);
});


// 2. To update a author based on ID in the database

//http://localhost:3000/author-update/1


app.put("/author-update/:id", (req,res) => {

    let {id} = req.params;
    id = Number(id);
    db.authors.forEach((author) => {
        if (author.id === id) {
            //console.log({...author, ...req.body})
            return {...author, ...req.body}
        }
        return author;
    })
    return res.json(db.authors);
});


// 3. To update a publication based on  in the database

//http://localhost:3000/publication-update/1


app.put("/publication-update/:id", (req,res) => {

    let {id} = req.params;
    id = Number(id);

    db.publications.forEach((publication) => {
        if (publication.id === id) {
            //console.log({...publication, ...req.body})
            return {...publication, ...req.body}
        }
        return publication;
    })
    return res.json(db.publications);
});


         // DELETE APIs


// 1. To delete a book based on ISBN from the database

//http://localhost:3000/book-delete/12345ONE


app.delete("/book-delete/:isbn", (req,res) => {

    const {isbn} = req.params;
    const filteredBooks = db.books.filter((book) => book.ISBN!==isbn);
    console.log(filteredBooks);
    db.books = filteredBooks;
    return res.json(db.books);
});



// 2. To delete an author based on ID from the database

//http://localhost:3000/author-delete/1


app.delete("/author-delete/:id", (req,res) => {

    let {id} = req.params;
    //console.log(id);
    id = Number(id);
    const filteredAuthors = db.authors.filter((author) => author.id!==id);
    console.log(filteredAuthors);
    db.authors = filteredAuthors;
    return res.json(db.authors);
});


// 3. To delete a publication based on ID from the database

//http://localhost:3000/publication-delete/1


app.delete("/publication-delete/:id", (req,res) => {

    let {id} = req.params;
    id = Number(id);
    const filteredPublications = db.publications.filter((publication) => publication.id!==id);
   // console.log(filteredPublications);
    db.publications = filteredPublications;
    return res.json(db.publications);
});




// 4. To delete an author from book using book ISBN & author id from the database

//http://localhost:3000/book-author-delete/12345ONE/1


app.delete("/book-author-delete/:isbn/:id", (req,res) => {
    let {isbn, id} = req.params;
    id = Number(id);

    db.books.forEach((book) => {
        if (book.ISBN === isbn){
            if (!book.authors.includes(id)) {
                return;
            }
            book.authors = book.authors.filter((author) => author!==id);
            return book;
        }
        console.log(book)
        return book;
        
    })
    return res.json(db.books);
});



// 5. To delete a book from author using author id & book ISBN from the database

//http://localhost:3000/author-book-delete/1/12345ONE


app.delete("/author-book-delete/:id/:isbn", (req,res) => {
    let {isbn, id} = req.params;
    id = Number(id);

    db.authors.forEach((author) => {
        if (author.id === id){
            if (!author.books.includes(isbn)) {
                return;
            }
            author.books = author.books.filter((book) => book!==isbn);
            return author;
        }
        console.log(author)
        return author;
        
    })
    console.log(db.authors)
    return res.json(db.authors);
});
  

app.listen( 3000, () => {
    console.log("MY EXPRESS APP IS RUNNING...")
});

