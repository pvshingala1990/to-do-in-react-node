const express = require('express');
const app = express();
const mongoose = require('mongoose');
const NotesRouter = require('./Routes/NodeRoutes');
const cors = require('cors');

// share json data
app.use(express.json());

// to cross connection between to website
app.use(cors());

app.use("/", NotesRouter);

// connect with mongoDB database
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to Database"))
    .catch((err) => {
        console.log(err);
    });

app.listen(5000, () => console.log("Listen has been started..."));