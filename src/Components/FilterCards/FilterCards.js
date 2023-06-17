import React, { useEffect, useRef } from 'react';
import './FilterCards.css';

function FilterCards(props) {
  const cardContainerRef = useRef(null);
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

 const handleClick = async (path) => {

    const fileUrl = await getFileFromServer(`http://localhost:8081/${path}`);
    if (fileUrl !== null) {
      const popup = window.open('blank', '_blank', 'width=600,height=400');
      popup.document.write(`<pre>${fileUrl}</pre>`);
    } else {
      console.error('Error getting file content');
    }
  };

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
              </div>
            )  
        })
      }
    </div>
  );
}

export default FilterCards;