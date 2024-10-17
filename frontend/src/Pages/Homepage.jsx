import React from 'react'
import Filter from '../Components/Filter'
import NoteCardContainer from '../Components/NoteCardContainer'

function Homepage({notes}) {
  return (
    <div>
      <Filter/>
      <NoteCardContainer notes={notes}/>
    </div>
  )
}

export default Homepage
