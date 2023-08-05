const Button = (props) => {

  return (
    <>
      <div className='controlPanel-button'>
          <button className= {props.className} onClick={props.handleClick}>{props.body}</button>
      </div>
    </>
  )
}

export default Button