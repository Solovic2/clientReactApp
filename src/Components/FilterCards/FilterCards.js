import React, { useEffect, useRef, useState } from 'react';
import './FilterCards.css';

function FilterCards(props) {
  const cardContainerRef = useRef(null);
  const infoContainerRef = useRef(null);
  const [showForm, setShowForm] = useState({});

  // Show ScrollBar When There Are Elements Fit The Height Of The ScrollBar Or Hide It When No Element Fit The Height 
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    function toggleScrollbar() {
      if (cardContainer.scrollHeight > cardContainer.clientHeight) {
        cardContainer.classList.remove('hide-scrollbar');
      } else {
        cardContainer.classList.add('hide-scrollbar');
      }
    }
    window.addEventListener('resize', toggleScrollbar);
    toggleScrollbar();
    return () => {
      window.removeEventListener('resize', toggleScrollbar);
    };
  }, []);
  // Show ScrollBar When There Are Elements Fit The Width Of The ScrollBar Or Hide It When No Element Fit The Width 
  useEffect(() => {
    const infoContainer = infoContainerRef.current;
    if (!infoContainer) {
      return;
    }
    function toggleScrollbar() {
      if (infoContainer.scrollWidth > infoContainer.clientWidth) {
        infoContainer.classList.remove('show-scrollbar');
      } else {
        infoContainer.classList.add('show-scrollbar');
      }
    }
    window.addEventListener('resize', toggleScrollbar);
    toggleScrollbar();
    return () => {
      window.removeEventListener('resize', toggleScrollbar);
    };
   
  }, []);
  // Show Shakwa When Press The Button
 const handleClick = async (path) => {

    const fileUrl = await getFileFromServer(`http://localhost:8081/${path}`);
    if (fileUrl !== null) {
      const popup = window.open('blank', '_blank', 'width=600,height=400');
      popup.document.write(`<pre>${fileUrl}</pre>`);
    } else {
      console.error('Error getting file content');
    }
  };
  // Get File From Server Http-Server
  const getFileFromServer = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
      }
      const text = await response.text();
      return text;
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  };
  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:9000/delete-complain/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete card');
      }

      
      props.setValuesData(props.data.filter(card => card.id !== id));
      // Remove the deleted card from the state

    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };
  // Handle When Submit
  const handleSubmit = async (event, id) => {
    event.preventDefault(); // prevent default form submission behavior
    const inputValue = event.target.elements.infoInput.value;
    if(inputValue !== ''){
      console.log('Form submitted with value:', inputValue);
      // do something with the input value, like submit it to a server
      // Update
      try {
        console.log(inputValue)
        const response = await fetch(`http://localhost:9000/update-complain/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({info: inputValue})
        });

        if (!response.ok) {
          throw new Error('Failed to delete card');
        }
        props.setValuesData(prevData => {
          const updatedData = prevData.map(card => {
            if (card.id === id) {
              return { ...card, info: inputValue };
            }
            return card;
          });
          return updatedData;
        });
  
      } catch (error) {
        console.error('Error deleting card:', error);
      }
      setShowForm(prevShowForm => ({
        ...prevShowForm,
        [id]: false
      }));
    }
    
    
  };

  const handleEdit = (id) => {
    setShowForm(prevShowForm => ({
      ...prevShowForm,
      [id]: !prevShowForm[id]
    }));
  };


  return (
    <div className="card-container hide-scrollbar" ref={cardContainerRef}>
      {
        props.data?.map((element, index) => {    
            let audioElement = null;
            let path = '';
              if(element.mobile !== null &&  element.mobile !== ''){
                path = `${element.mobile}-${element.fileDate}.${element.fileType}`
              }else{
                path = `${element.fileDate}.${element.fileType}`
              }
            if (element.fileType === 'wav') { 
              audioElement = <audio controls src={`http://localhost:8081/${path}`} />
            }else{
              audioElement = <div><button className="btn btn-primary"onClick={() => handleClick(path)}>قراءة الشكوى</button></div>
            }
          
            return (   
              <div key={element.id} className="card">
                <div className="mobile">{element.mobile || 'UnKnown'}</div>
                <div className="file-date">{element.fileDate}</div>
                <div className="audio-element">
                  {audioElement}
                </div>
                <div className="deleteBtn">
                  <button className="btn btn-danger" onClick={() => handleDelete(element.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
                <div className='reply-and-edit'>
                  
                  <div className="scrollable-container" ref={infoContainerRef}>
                    <label>الرد :</label>
                    <div className="scrollable-content">
                      {element.info}
                    </div>
                  </div>
                  
                </div>
                { (element.info !== null && element.info !== '' ) && (
                  <div className="edit-button">
                    <button onClick={() => handleEdit(element.id)}>
                      {showForm[element.id] ? "Cancel" : "Edit"}
                    </button>
                  </div>
                )}
                
                {(element.info === null || element.info === '' || showForm[element.id]) &&(
                    <div className='form-submit'>
                      <form onSubmit={(event) => handleSubmit(event, element.id)} className='d-flex justify-content-between w-100'>
                        <input type="text" name= "infoInput"className='my-input mr-2'  placeholder='الرد' defaultValue={element.info}/>
                        <button type="submit" className="btn btn-sm btn-success">{showForm[element.id] ? "تعديل" : "إضافة رد"}</button>
                      </form>
                    </div>
                   )
                }
              </div>
            )  
        })
      }
    </div>
  );
}

export default FilterCards;