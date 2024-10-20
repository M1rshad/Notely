import React from 'react'

function Filter({handleFilterText}) {
  return (
    <div>
      <div className="container" style={{ width: "500px", margin: "20px auto" }}>
      <select
        className="form-select"
        aria-label="Default select example"
        style={{ height: "50px" }}
        onChange={(e) => handleFilterText(e.target.value)}
      >
        <option value="">All Notes</option>
        <option value="BUSINESS">Business</option>
        <option value="PERSONAL">Personal</option>
        <option value="IMPORTANT">Important</option>
      </select>
    </div>
    </div>
  )
}

export default Filter
