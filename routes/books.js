const { response } = require("express");
const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none 
 */
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by the id
 * Access: Public
 * Parameters: id 
 */
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id);
    if (!book)
        return res.status(404).json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, data: book });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get('/issued/by-user', (req, res) => {
    const usersWithIsssuedBook = users.filter((each) => {
        if (each.issuedBook) return each;
    });
    const issuedBooks = [];
    usersWithIsssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length === 0)
        return res.status(404).json({ success: false, message: "No books issued" })
    return res.status(200).json({ success: true, data: issuedBooks })
});

/**
 * Route: /books
 * Method: POST
 * Description: Create new book 
 * Access: Public
 * Parameters: none
 */
router.post('/', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No Valid Data",
        });
    }
    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists with the same Id"
        });
    }
    const allBooks = [...books, data];
    return res.status(200).json({
        success: true,
        data: allBooks
    });
});


/**
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by id
 * Access: Public
 * Parameters: id
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book not found with that particular Id",
        });
    }
    const UpdatedData = books.map((each) => {
        if (each.id === id) {
            return { ...each, ...data };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: UpdatedData,
    })
});


module.exports = router;