const { response } = require("express");
const express = require("express");
const {
    getAllBooks,
    getSingleBookById,
    getAllIssuedBooks,
    addNewBook,
    updateBookById
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { UserModel, BookModel } = require("../models/index");


const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none 
 */
// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books,
//     });
// });

router.get('/', getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by the id
 * Access: Public
 * Parameters: id 
 */
// router.get("/:id", (req, res) => {
//     const { id } = req.params;
//     const book = books.find((each) => each.id === id);
//     if (!book)
//         return res.status(404).json({ success: false, message: "Book not found" });
//     return res.status(200).json({ success: true, data: book });
// });

router.get("/:id", getSingleBookById);

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description: Create new book 
 * Access: Public
 * Parameters: none
 */
router.post('/', addNewBook);


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: id
 */
router.put('/:id', updateBookById);


module.exports = router;