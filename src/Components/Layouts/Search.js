import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Search = () => {

  const [keyword, setkeyword] = useState('')
  const Navigate = useNavigate()

  const keypressed = (e) => {
    console.log(e.target.value);
    e.preventDefault();

    if (keyword.trim()) {
      Navigate(`/search/${keyword}`)
    } else {
      Navigate('/')
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      Navigate(`/search/${keyword}`)
    } else {
      Navigate('/')
    }

  }
  return (
    <form onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setkeyword(e.target.value)}
          onKeyUp={keypressed}
        />
        <div className="input-group-append">
          <button type='submit' id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search