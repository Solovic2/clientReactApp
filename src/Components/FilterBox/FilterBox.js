import React from 'react'

const FilterBox = (props) => {

  return (
    <>
      <div className="container">
          {props.children}
      </div>
    </>
  )
}

export default FilterBox