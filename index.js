const express = require("express");

// impport db connection file
const DbConnection = require("./databaseConnection");

// import db
const dotenv = require("dotenv");

// const { UserModel, BookModel } = require("./models/index");

// import routes
const UserRouter = require("./routes/users");
const BooksRouter = require("./routes/books");

dotenv.config();

const app = express();

DbConnection();

const PORT = 8081;

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server started successfully",
    });
});

// http://localhost:8081/users
app.use("/users", UserRouter);
app.use("/books", BooksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "this route dosen't exist !",
    })
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
});