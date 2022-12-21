const { response, json } = require("express");
const express = require("express");

// import routes
const UserRouter = require("./routes/users");
const BooksRouter = require("./routes/books");

const app = express();

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