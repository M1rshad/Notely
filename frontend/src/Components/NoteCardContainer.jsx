import React, { useEffect } from 'react';
import NoteCard from './NoteCard';
import './NoteContainer.css';

function NoteCardContainer({ notes }) {
  useEffect(() => {
    console.log(notes);
  }, [notes]);

  return (
    <div className="container">
      <div className="row">
        {notes.map((note) => (
          <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-3" key={note.id}>
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteCardContainer;

