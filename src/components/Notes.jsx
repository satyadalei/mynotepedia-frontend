import React, { useContext, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/noteContext'
import Addnote from './Addnote';

const Notes = () => {
  const noteContext = useContext(NoteContext);
  const { allNotes, deletNote,updateNote } = noteContext;
  const reversedAllNotes = [...allNotes].reverse();
  const modalLunchBtn = useRef(null);
  // const [currentEditingId, setCurrentEditingId] = useState(null);
  const [currentEditingData, setCurrentEditingData] = useState({
    title: "",
    description: ""
  })
  // when some one clicks on editing button - it launches the modal
  const launchModal = (noteId, noteTitle, noteDescription) => {
    modalLunchBtn.current.click();
    setCurrentEditingData({
      noteId : noteId,
      title: noteTitle,
      description: noteDescription
    })
    // console.log("id :" + noteId);
    // console.log("title :" + noteTitle);
    // console.log("desc :" + noteDescription);
  }
  const handleChange = (e) => {
    setCurrentEditingData({ ...currentEditingData, [e.target.name]: e.target.value });
  }

  return (
    <>
      {/* modal */}
      <button style={{ display: "none" }} ref={modalLunchBtn} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
        Open modal for @mdo
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">Title:</label>
                  <input onChange={handleChange} type="text" className="form-control" value={currentEditingData.title} name="title" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="col-form-label">Description:</label>
                  <textarea onChange={handleChange} className="form-control" name='description' value={currentEditingData.description} ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button onClick={()=>{updateNote(currentEditingData.noteId,currentEditingData.title,currentEditingData.description)}} type="button" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
            </div>
          </div>
        </div>
      </div>
      {/* Add a note box */}
      <Addnote />
      {/* All note item */}
      <div className='row' style={{ width: "95%", margin: "0 auto" }} >
        <h1>Your all notes</h1>
        {reversedAllNotes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} launchModal={launchModal} deletNote={deletNote}  />
          )
        })}
      </div>
    </>
  )
}

export default Notes