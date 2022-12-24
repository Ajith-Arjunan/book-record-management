const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bookSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    }
);

/**
 * collection will be having a name called :book  
*/
module.exports = mongoose.model("Book", bookSchema);