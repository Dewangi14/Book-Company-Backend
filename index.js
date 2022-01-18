// MAIN BACKEND FILE

const db = require("./database/index.js");
const BookModel = require('./database/books');
const AuthorModel = require('./database/authors');
const PublicationModel = require('./database/publications');

const express = require("express");
const app = express();
app.use(express.json());


// Import the mongoose module
var mongoose = require('mongoose');

// Set up default mongoose connection
var mongoDB = "mongodb+srv://dewangi_dubey:dewangi14@cluster0.ziupa.mongodb.net/book-company-backend?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"))


// APIs

/*
Route                 /
Description           Home Page
Access                PUBLIC
Parameter             None
Methods               GET
*/

// example: http://localhost:3000/

app.get("/", (req,res) => {
    return res.json({"WELCOME": `to my Backend Software for the Company`});
});



/*
Route                 /books
Description           Get all the books
Access                PUBLIC
Parameter             None
Methods               GET
*/

// example: http://localhost:3000/books

app.get("/books", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route                 /book-isbn/:isbn
Description           Get specific book on ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET
*/

// example: http://localhost:3000/book-isbn/12345ONE

app.get("/book-isbn/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const getSpecificBook = await BookModel.findOne({ISBN : isbn});
    if (getSpecificBook === null) {
        return res.json({"error": `No book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});



/*
Route                 /book-category/:category
Description           Get specific books on category
Access                PUBLIC
Parameter             category
Methods               GET
*/

// example: http://localhost:3000/book-category/tech

app.get("/book-category/:category", async (req,res) => {
    const {category} = req.params;
    const getSpecificBook = await BookModel.find({category : category});
    if (getSpecificBook.length===0) {
        return res.json({"error": `No book found for the category of ${category}`});
    }
    return res.json(getSpecificBook);
});



/*
Route                 /authors
Description           Get all authors
Access                PUBLIC
Parameter             None
Methods               GET
*/

// example: http://localhost:3000/authors

app.get("/authors", async (req,res) => {
   
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});



/*
Route                 /author-id/:id
Description           Get specific author on ID
Access                PUBLIC
Parameter             id
Methods               GET
*/

// example: http://localhost:3000/author-id/3

app.get("/author-id/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificAuthor = await AuthorModel.findOne({id : id});
    if (getSpecificAuthor===null) {
        return res.json({"error": `No author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
});


/*
Route                 /author-isbn/:isbn
Description           Get specific authors on book ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET
*/

// example: http://localhost:3000/author-isbn/12345ONE

app.get("/author-isbn/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const getSpecificAuthor = await AuthorModel.find({books : isbn});
    if (getSpecificAuthor.length===0) {
        return res.json({"error": `No author found for the book isbn of ${isbn}`});
    }
    return res.json(getSpecificAuthor);
});


/*
Route                 /publications
Description           Get all publications
Access                PUBLIC
Parameter             None
Methods               GET
*/

// example: http://localhost:3000/publications

app.get("/publications", async (req,res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


/*
Route                 /publication-id/:id
Description           Get specific publication on ID
Access                PUBLIC
Parameter             id
Methods               GET
*/

// example: http://localhost:3000/publication-id/2

app.get("/publication-id/:id", async (req,res) => {
    let {id} = req.params;
    id = Number(id);
    const getSpecificPublication = await PublicationModel.findOne({id : id});
    if (getSpecificPublication===null) {
        return res.json({"error": `No publication found for the id of ${id}`});
    }
    return res.json(getSpecificPublication);
});


/*
Route                 /publication-isbn/:isbn
Description           Get all publications on book ISBN
Access                PUBLIC
Parameter             isbn
Methods               GET
*/

// example: http://localhost:3000/publication-isbn/12345ONE

app.get("/publication-isbn/:isbn", async (req,res) => {
    const {isbn} = req.params;
    const getSpecificPublication = await PublicationModel.find({books : isbn});
    if (getSpecificPublication.length===0) {
        return res.json({"error": `No publication found for the book isbn of ${isbn}`});
    }
    return res.json(getSpecificPublication);
});


/*
Route                 /book
Description           Add a new book 
Access                PUBLIC
Parameter             None
Methods               POST
*/

// example: http://localhost:3000/book 

app.post("/book", async (req,res) => {

    const addNewBook = await BookModel.create(req.body);
    return res.json({BookAdded: addNewBook, message:"Book was added successfully!"});
});


/*
Route                 /author
Description           Add a new author
Access                PUBLIC
Parameter             None
Methods               POST
*/

// example: http://localhost:3000/author

app.post("/author", async (req,res) => {

    const addNewAuthor = await AuthorModel.create(req.body);
    return res.json({AuthorAdded: addNewAuthor, message:"Author was added successfully!"});
});


/*
Route                 /publication
Description           Add a new publication
Access                PUBLIC
Parameter             None
Methods               POST
*/

// example: http://localhost:3000/publication 

app.post("/publication", async (req,res) => {

    const addNewPublication = await PublicationModel.create(req.body);
    return res.json({PublicationAdded: addNewPublication, message:"Publication was added successfully!"});
});


/*
Route                 /book-update/:isbn
Description           Update book on ISBN
Access                PUBLIC
Parameter             isbn
Methods               PUT
*/

// example: http://localhost:3000/book-update/12345ONE

app.put("/book-update/:isbn", async (req,res) => {

    const {isbn} = req.params;
    const updateBook = await BookModel.findOneAndUpdate({ISBN: isbn}, req.body, {new:true});
    return res.json({BookUpdated: updateBook, message:"Book was updated successfully!"});
});


/*
Route                 /author-update/:id
Description           Update author on ID
Access                PUBLIC
Parameter             id
Methods               PUT
*/

// example: http://localhost:3000/author-update/4

app.put("/author-update/:id", async (req,res) => {

    let {id} = req.params;
    id = Number(id);
    const updateAuthor = await AuthorModel.findOneAndUpdate({id: id}, req.body, {new:true});
    return res.json({AuthorUpdated: updateAuthor, message:"Author was updated successfully!"});
});


/*
Route                 /publication-update/:id
Description           Update publication on ID
Access                PUBLIC
Parameter             id
Methods               PUT
*/

// example: http://localhost:3000/publication-update/3

app.put("/publication-update/:id", async (req,res) => {

    let {id} = req.params;
    id = Number(id);
    const updatePublication = await PublicationModel.findOneAndUpdate({id: id}, req.body, {new:true});
    return res.json({PublicationUpdated: updatePublication, message:"Publication was updated successfully!"});
});



/*
Route                 /book-delete/:isbn
Description           Delete book on ISBN
Access                PUBLIC
Parameter             isbn
Methods               DELETE
*/

// example: http://localhost:3000/book-delete/12345ONE 

app.delete("/book-delete/:isbn", async (req,res) => {

    const {isbn} = req.params;
    const deleteBook = await BookModel.deleteOne({ISBN: isbn});
    return res.json( {BookDeleted : deleteBook, message: 'Book was deleted successfully!'} )
});



/*
Route                 /author-delete/:id
Description           Delete author on ID
Access                PUBLIC
Parameter             id
Methods               DELETE
*/

// example: http://localhost:3000/author-delete/4

app.delete("/author-delete/:id", async (req,res) => {

    let {id} = req.params;
    id = Number(id);
    const deleteAuthor = await AuthorModel.deleteOne({id: id});
    return res.json( {AuthorDeleted : deleteAuthor, message: 'Author was deleted successfully!'} )
});


/*
Route                 /publication-delete/:id
Description           Delete publication on ID
Access                PUBLIC
Parameter             id
Methods               DELETE
*/

// example: http://localhost:3000/publication-delete/3 

app.delete("/publication-delete/:id", async (req,res) => {

    let {id} = req.params;
    id = Number(id);
    const deletePublication = await PublicationModel.deleteOne({id: id});
    return res.json( {PublicationDeleted : deletePublication, message: 'Publication was deleted successfully!'} )
});



/*
Route                 /book-author-delete/:isbn/:id
Description           Delete author on ID from book on ISBN
Access                PUBLIC
Parameter             isbn , id
Methods               DELETE
*/

// example: http://localhost:3000/book-author-delete/12345ONE/1

app.delete("/book-author-delete/:isbn/:id", async (req,res) => {
    let {isbn, id} = req.params;
    id = Number(id);
    let getSpecificBook = await BookModel.findOne({ISBN:isbn});
    if(getSpecificBook===null) {
        return res.json({"error":`No book found for the ISBN of ${isbn}`});
    }
    else{
        getSpecificBook.authors.remove(id);
        const updateBook = await BookModel.findOneAndUpdate({ISBN:isbn}, getSpecificBook, {new:true});
        return res.json( {BookUpdated: updateBook, message: 'Author was deleted from the book successfully!'} )
    }
});


/*
Route                 /author-book-delete/:id/:isbn
Description           Delete book on ISBN from author on ID
Access                PUBLIC
Parameter             id , isbn
Methods               DELETE
*/

// example:  http://localhost:3000/author-book-delete/3/12345Three

app.delete("/author-book-delete/:id/:isbn", async (req,res) => {
let {id, isbn} = req.params;
id = Number(id);
let getSpecificAuthor = await AuthorModel.findOne({id:id});
if(getSpecificAuthor===null) {
    return res.json({"error":`No author found for the ID of ${id}`});
}
else{
    getSpecificAuthor.books.remove(isbn);
    const updateAuthor = await AuthorModel.findOneAndUpdate({id:id}, getSpecificAuthor, {new:true});
    return res.json( {AuthorUpdated: updateAuthor, message: 'Book was deleted from the Author successfully!'} )
}
});
  

app.listen(process.env.PORT || 3000, () => {
    console.log("MY EXPRESS APP IS RUNNING...")
});

