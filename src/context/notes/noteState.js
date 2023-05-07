import { useState, useEffect, useContext} from "react";
import NoteContext from "./noteContext";
import { useNavigate } from 'react-router-dom';
import LoginContext from "../loginstatus/loginContext";

const NoteState = (props) => {
   // fetchAllNotes();
   const loginContext = useContext(LoginContext);
   const {logedInStatus} = loginContext;
   const navigate = useNavigate();
   //gets_api_url from .env file
   const host = process.env.REACT_APP_HOST_URL;
   const [allNotes, setAllNotes] = useState([]);
   const fetchAllNotes = async () => {
      const url = `${host}/api/notes/fetchallnotes`;
      const getAllNotes = await fetch(url, {
         method: "GET",
         credentials: 'include',
         headers: {
            "content-Type": "application/json"
         }
      })
      const response = await getAllNotes.json();
      if (response.msg === "All notes found" && response.success ) {
         setAllNotes(response.foundNotes);
      }else{
         //handle errors
         console.log(response);
         //navigate to home page with some error
         navigate("/");
      }
   }
   useEffect(() => {
      if (logedInStatus) {
         fetchAllNotes();  
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [logedInStatus]);

   // add a note
   const addNote = async(note)=>{
      const url = `${host}/api/notes/addnote`;
      const addANote = await fetch(url,{
         method : "POST",
         credentials: 'include',
         headers : {
            "content-Type" : "application/json"
         },
         body : JSON.stringify(note)
      });
      const response = await addANote.json();
      if(response.msg === "note saved"){
         //fetch all notes 
         fetchAllNotes()
      }else{
         //handle error
         console.log(response);
         //navigate to home page with some error
        navigate("/");
      }
   }
   //delete a note
   const deletNote = async(noteId)=>{
      const url = `${host}/api/notes/deletenote/${noteId}`;
      const deleteANote = await fetch(url,{
         method: "DELETE",
         credentials: "include",
         headers : {
            "content-Type": "application/json"
         }
      })
       const response = await deleteANote.json();
      if (response.msg === "note deleted successfully") {
         //note deleted successfully
         fetchAllNotes()
      }else{
      //handle error
        console.log(response);
        //navigate to home page with some error
        navigate("/");
      }
   }
   // update a note
   const updateNote = async (noteId,title,description)=>{
      // console.log(noteId);
      // console.log(title);
      // console.log(description);
      const url = `${host}/api/notes/updatenote/${noteId}`;
      const updateANote = await fetch(url,{
         method:"PUT",
         credentials: 'include',
         headers:{
            "content-Type" : "application/json"
        },
        body: JSON.stringify({title,description})
      })
      const response = await updateANote.json();
      if (response.msg === "note updated successfully") {
         // update notes
         fetchAllNotes();
      }else{
         //handle error
         console.log(response);
         //navigate to home page with some error
         navigate("/")
      }
   }
   
   return (
      <NoteContext.Provider value={{ allNotes,addNote,deletNote,updateNote }} >
         {props.children}
      </NoteContext.Provider>
   )
}

export default NoteState;