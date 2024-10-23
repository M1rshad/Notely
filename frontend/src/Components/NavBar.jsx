import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSquarePlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom';

function NavBar({searchText, handleSearchText} ) {
  return (
    <div>
      <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
      <div className="container d-flex justify-content-around">
        <a className="navbar-brand" href="/">
          <h4 style={{ fontWeight: "bold" }}>Notely</h4>
        </a>
        <div className="d-flex">
          <div
            className="input-group input-group-sm"
            style={{ width: "500px", height: "40px" }}
          >
            <input
              className="form-control"
              placeholder="Search"
              value={searchText}
              onChange={(e) => handleSearchText(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </div>
        </div>

        <Link to="/add-note"  style={{ textDecoration: "none" }}>
        <button
            className="btn btn-outline-primary btn-md"
            type="button"
           
          >
            <FaSquarePlus className="me-2 fs-6" /> Add Notes
          </button>
        </Link>
      </div>
    </nav>
    </div>
  )
}

export default NavBar
