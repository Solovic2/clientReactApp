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

  return (
    <div className="card-container hide-scrollbar" ref={cardContainerRef}>
      {
        props.data?.map((element, index) => {    
            let audioElement = null;
            if (element.fileType === 'wav') {
              let path = '';
              if(element.mobile !== null &&  element.mobile !== ''){
                path = `${element.mobile}-${element.fileDate}.${element.fileType}`
              }else{
                path = `${element.fileDate}.${element.fileType}`
              }
              audioElement = <audio controls src={`http://localhost:8081/${path}`} />
            }else{
              audioElement = <div>text</div>
            }
          
            return (   
              <div key={element.id} className="card">
                <div className="mobile">{element.mobile || 'UnKnown'}</div>
                <div className="file-date">{element.fileDate}</div>
                <div className="audio-element">
                  {audioElement}
                </div>
              </div>
            )  
        })
      }
    </div>
  );
}

export default FilterCards;