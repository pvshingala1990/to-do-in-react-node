import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

    const [data, setData] = useState([]);
    const [note, setNote] = useState({
        title: "",
        message: ""
    });

    useEffect(() => {
        const getData = () => {
            axios.get("http://localhost:5000/getNote")
                .then((res) => res.data)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        getData();
    }, []);

    const addNote = () => {
        if (note.title !== "" && note.message !== "") {
            axios.post("http://localhost:5000/addNote", { title: note.title, message: note.message })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        // data.push(res.data);
                        // console.log(data);
                        setData([...data, res.data]);
                        document.getElementById("title").value = "";
                        document.getElementById("message").value = "";
                    } else {
                        alert(res.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            alert("All field are required!!");
        }
    }

    const deleteNote = (id) => {
        axios.post("http://localhost:5000/deleteNote", { id: id })
            .then((res) => res.data)
            .then((res) => {
                if (res.success) {
                    setData(data.filter((data) => data._id !== id));
                } else {
                    alert(res.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updateNote = (index) => {
        const id = document.getElementById("id" + index).value;
        const title = document.getElementById("title" + index).value;
        const message = document.getElementById("message" + index).value;

        if (title && message) {
            axios.post("http://localhost:5000/updateNote", { id, title, message })
                .then((res) => res.data)
                .then((res) => {
                    if (res.success) {
                        let newArr = [...data];
                        newArr[index].title = title;
                        newArr[index].message = message;
                        setData(newArr);
                    } else {
                        alert(res.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg 
                navbar-light bg-success">
                <a className="navbar-brand">
                    <p style={{ fontSize: "30px" }}>
                        THE NOTES TAKER
                    </p>
                </a>
            </nav>

            <div className="container my-3">
                <h1>Take your Notes here</h1>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Add a Note
                        </h5>
                        <div className="form-group my-2">
                            <input type="text" placeholder='Title' className="form-control mt-2" name="title" id="title" onChange={(e) => setNote({ ...note, title: e.target.value })} />
                            <textarea className="form-control mt-2"
                                id="message" rows="3" onChange={(e) => setNote({ ...note, message: e.target.value })}>
                            </textarea>
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ backgroundColor: "green" }}
                            onClick={addNote}
                        >
                            Add Note
                        </button>
                    </div>
                </div>
                <hr />
                <h1>Your Notes</h1>
                <hr />
                <div id="notes" className="row container-fluid">
                    {
                        data.map((data, index) => {
                            return (
                                <div className="noteCard my-2 mx-2 card"
                                    style={{ width: "18rem" }} key={index}>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {data.title}
                                        </h5>
                                        <p className="card-text">
                                            {data.message}
                                        </p>
                                        <button className="btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target={"#exampleModal" + index}>
                                            Update Note
                                        </button>
                                        <button className="btn btn-primary btn-sm m-1" onClick={() => deleteNote(data._id)}>
                                            Delete Note
                                        </button>
                                    </div>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id={"exampleModal" + index} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Update note</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <input type="hidden" defaultValue={data._id} name="title" id={"id" + index} />
                                                    <input type="text" defaultValue={data.title} placeholder='Title' className="form-control mt-2" name="title" id={"title" + index} />
                                                    <textarea className="form-control mt-2" defaultValue={data.message}
                                                        id={"message" + index} rows="3">
                                                    </textarea>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="btn btn-primary" onClick={() => updateNote(index)}>Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default App;