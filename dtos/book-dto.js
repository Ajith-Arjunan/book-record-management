// DTO => Data Transfer Object

class IssuedBook {
    _id;
    name;
    genre;
    price;
    publisher;
    issedBy;
    issuedDate;
    returnDate;

    constructor(user) {

        this._id = user.IssuedBook._id;
        this.name = user.IssuedBook.name;
        this.genre = user.IssuedBook.genre;
        this.price = user.IssuedBook.price;
        this.publisher = user.IssuedBook.publisher;
        this.issedBy = user.IssuedBook.issedBy;
        this.issuedDate = user.IssuedBook.issuedDate;
        this.returnDate = user.IssuedBook.returnDate;

    }
}



module.exports = IssuedBook;