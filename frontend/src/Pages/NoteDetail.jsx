import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { FiEdit } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import { FormatDate } from '../Components/FormatDate'
import './NoteDetail.css'
import Modal from '../Components/Modal'
import { deleteNote, noteDetail } from '../Api/Api'

function NoteDetail() {
  
  const [note, setNote] = useState({})
  const {slug} = useParams()

  
  const [isOpen, setIsOpen] = useState(false)
  const handleIsOpen = () =>{
    setIsOpen(!isOpen)
  }
  const handleDeleteNote = (slug) => {
    deleteNote(slug)
  }

  useEffect(()=>{
    if (slug) {
      noteDetail(slug, setNote);
  }

  },[slug])


  return (
    <>
       <div className="note-container">
        <h3 className="title">{note.title}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">
            {" "}
            created: {FormatDate(note.created)}
          </p>
          <p className="note-date font-12 text-muted me-5">
            last updated: {FormatDate(note.updated)}
          </p>
        </span>
        <span className="button-group">
          <Link to={`/edit-note/${slug}`}>
            <button className="btn btn-primary">
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>

          <button className="btn btn-danger" onClick={handleIsOpen}>
            <BiSolidTrashAlt />
            <span>Delete</span>
          </button>
        </span>
        <p className="description">{note.body}</p>
      </div>
      {isOpen && (
        <Modal
          handleIsOpen={handleIsOpen}
          deleteNote={() => handleDeleteNote(slug)}
        />
      )} 
    </> 
  )
}

export default NoteDetail
