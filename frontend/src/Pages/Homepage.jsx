import React from 'react'
import Filter from '../Components/Filter'
import NoteCardContainer from '../Components/NoteCardContainer'

function Homepage({notes, handleFilterText}) {
  return (
    <div>
      {notes.length > 1 ? <Filter handleFilterText = {handleFilterText}/> : <h4 style={{marginTop : '50px'}}>No notes found</h4> }
      <NoteCardContainer notes={notes}/>
    </div>
  )
}

export default Homepage
