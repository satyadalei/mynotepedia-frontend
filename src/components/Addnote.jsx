import React,{useState, useContext} from 'react'
import NoteContext from '../context/notes/noteContext'
const Addnote = () => {
    //add note
    const noteContext = useContext(NoteContext);
    const {addNote } = noteContext;
    const [noteDetails, setNoteDetails] = useState({
        title: "",
        description: ""
    })
    const handleChange = (e) => {
        setNoteDetails({ ...noteDetails, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(noteDetails);
        setNoteDetails({
            title: "",
            description: ""
        });
    }
    return (
        <>
            <div className='container my-2'>
                <h1>This is Notes page</h1>
                <h1>Add a note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={handleChange} value={noteDetails.title} type="text" className="form-control" name='title' aria-describedby="emailHelp" autoComplete='off' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input onChange={handleChange} value={noteDetails.description} type="text" className="form-control" name='description' autoComplete='off' />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Add note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote