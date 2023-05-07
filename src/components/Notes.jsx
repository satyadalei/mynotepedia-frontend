import React, { useContext, useState, useRef } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/noteContext'
import Addnote from './Addnote';

const Notes = () => {
  const updateModalLunchBtn = useRef(null);
  const deleteModalLunchBtn = useRef(null);
  const noteContext = useContext(NoteContext);
  const { allNotes, deletNote, updateNote } = noteContext;
  const reversedAllNotes = [...allNotes].reverse();

  // const [currentEditingId, setCurrentEditingId] = useState(null);
  const [currentEditingData, setCurrentEditingData] = useState({
    noteId: "",
    title: "",
    description: ""
  })
  // when some one clicks on editing button - it launches the modal

  const launchUpdtModal = (noteId, noteTitle, noteDescription) => {
    updateModalLunchBtn.current.click();
    setCurrentEditingData({
      noteId,
      title: noteTitle,
      description: noteDescription
    })
  }
  const launchDeletModal = (noteId,noteTitle,noteDescription)=>{
    deleteModalLunchBtn.current.click();
    setCurrentEditingData({
      noteId,
      title: noteTitle,
      description: noteDescription
    })
  }
  const handleChange = (e) => {
    setCurrentEditingData({ ...currentEditingData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className='Delete-modal-popup'>
        <button style={{ display: "none" }} ref={deleteModalLunchBtn} type="button" className="btn btn-primary delete-btn" data-bs-toggle="modal" data-bs-target="#deleteModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">This note will be deleted</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h3>{currentEditingData.title}</h3>
                <p>{currentEditingData.description}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={()=>{deletNote(currentEditingData.noteId)}} type="button" className="btn btn-danger" data-bs-dismiss="modal" >Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='Update-modal-popup'>
        <button style={{ display: "none" }} ref={updateModalLunchBtn} type="button" className="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#updateModal" data-bs-whatever="@mdo">
          Open modal for @mdo
        </button>
        <div className="modal fade" id="updateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <button onClick={() => { updateNote(currentEditingData.noteId, currentEditingData.title, currentEditingData.description) }} type="button" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add a note box */}
      <Addnote />
      {/* All note item */}
      <div className='row' style={{ width: "95%", margin: "0 auto" }} >
        <h1>Your all notes</h1>

        { allNotes.length > 0 ? reversedAllNotes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} launchUpdtModal={launchUpdtModal} launchDeletModal={launchDeletModal} />
          )
        }) : <p>Yo do not have notes. Please upload one.</p> }
      </div>
    </>
  )
}

export default Notes