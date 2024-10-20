import React from 'react'
import Filter from '../Components/Filter'
import NoteCardContainer from '../Components/NoteCardContainer'

function Homepage({notes, handleFilterText}) {
  return (
    <div>
      <Filter handleFilterText = {handleFilterText}/>
      <NoteCardContainer notes={notes}/>
    </div>
  )
}

export default Homepage
