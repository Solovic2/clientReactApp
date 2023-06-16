import React from 'react'
import "./FilterSearch.css"

const FilterSearch = (props) => {
  return (
    <>
      <div className='searchBar'>
          <input className="search" type="search" placeholder="Search" onChange={props.handleChange} />
      </div>
    </>
  )
}

export default FilterSearch