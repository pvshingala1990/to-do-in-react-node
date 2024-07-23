const { default: mongoose } = require("mongoose");
const Note = require("../model/Note");

const getData = async (req, res) => {
    const result = await Note.find();
    res.json({ message: "Notes data", data: result, success: true });
}

const createData = async (req, res) => {
    const { title, message } = req.body;

    const newNote = new Note({
        title,
        message
    });

    await newNote.save()
        .then((data) => {
            res.json({ message: "Successfully added note", data: data, success: true });
        })
        .catch((err) => {
            console.log(err);
            res.json({ message: "Error", success: false });
        })
}

const updateData = async (req, res) => {
    const { id, title, message } = req.body;

    const result = await Note.findOneAndUpdate({ _id: id }, { title, message }, { new: true });

    if (result) {
        res.json({ message: "Done", success: true });
    } else {
        res.json({ message: "Error", success: false });
    }
}

const deleteData = async (req, res) => {
    const { id } = req.body;
    const result = await Note.deleteOne({ _id: mongoose.Types.ObjectId(id) });
    if (result) {
        res.json({ message: "Successfully removed note", success: true });
    } else {
        res.json({ message: "Error", success: false });
    }
}

module.exports = {
    getData,
    createData,
    updateData,
    deleteData
}