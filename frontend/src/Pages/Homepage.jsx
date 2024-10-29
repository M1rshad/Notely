import React from 'react'
import Filter from '../Components/Filter'
import NoteCardContainer from '../Components/NoteCardContainer'

function Homepage({notes, handleFilterText}) {
  return (
    <div>
      {notes.length >= 1 ? <Filter handleFilterText = {handleFilterText}/> : 
      <div className="d-flex justify-content-center " style={{ marginTop: '50px' }}>
    <   h4>No notes found</h4>
      </div>
 }
      <NoteCardContainer notes={notes}/>
    </div>
  )
}

export default Homepage
