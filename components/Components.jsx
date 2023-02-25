import React from "react"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import {Data} from "./Data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function Components() {
    const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes"))
        || [])
    
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )
    
    React.useEffect( () =>  {
        localStorage.setItem("notes", JSON.stringify(notes))
    },[notes])

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
            setNotes(oldNotes => {
                const newArray = []
                for(let a = 0; a < oldNotes.length; a ++) {
                    const oldNote = oldNotes[a]
                        if (oldNote.id === currentNoteId){
                            newArray.unshift({...oldNote, body:text})
                        }else{
                            newArray.push(oldNote)
                        }}
                        return newArray
                        })
                

        //setNotes(oldNotes => oldNotes.map(oldNote => {
          //  return oldNote.id === currentNoteId
          //      ? { ...oldNote, body: text }
          //      : oldNote
        
    }

    function deleteNote (event,noteId){
        event.stopPropagation()
        setNotes (oldNotes => oldNotes.filter(note => note.id !== noteId))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
