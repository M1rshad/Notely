import React from 'react'
import { FaNoteSticky } from 'react-icons/fa6'
import { MdMarkunread } from 'react-icons/md'
import { Link } from 'react-router-dom'

function NoteCard() {

  return(
    <div>
      <div className="col-md-4 single-note-item all-category">
      <div className="card card-body">
        <span className="side-stick" style={{ backgroundColor: 'blue' }}></span>
        <FaNoteSticky style={{ marginLeft: "auto", color: 'blue' }} />
        <Link  style={{textDecoration: "none", color: "black"}}>
        <h5
          className="note-title text-truncate w-75 mb-0"
          data-noteheading="Book a Ticket for Movie"
        >
          {/* {note.title} */}
        </h5>
        </Link>
        
        {/* <p className="note-date font-12 text-muted">{FormatDate(note.updated)}</p> */}
        <div className="note-content">
          <p
            className="note-inner-content text-muted"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
           {/* {body} */}
           aflasdfjlkasfjlkasjdflksjdlkfjsalkdfjlksadjflk sdflkajsf
            lksadjf sldkafjlskadj lkasjfla
          </p>
        </div>
        <div className="d-flex align-items-center">
       

          <span className="d-flex justify-contents-around">
            <a href="/notes-detail">
              <MdMarkunread
                style={{ fontSize: "25px", cursor: "pointer", color: 'blue' }}
              />
            </a>

            {/* <small className="text-muted">{note.category}</small> */}
          </span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NoteCard
