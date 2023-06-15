import React, { useEffect, useState } from 'react'
import "./FilterSearch.css"
const FilterSearch = () => {
  const [values, setValues] = useState([])
  const [filterData, setFilterData] = useState([])
  const [eventAction, setEventAction] = useState()
  // const folderPath = "E:\\Islam\\temp"

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');

    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'add') {
        setValues((prevValues) => [...prevValues, message.data]); // add the new data to the previous values
      } else if (message.type === 'delete') {
        console.log(message)
      } else {
        console.warn('Received unknown message type:', message.type);
      }
    });

    fetch("http://localhost:9000/")
      .then(res => res.json())
      .then(data => setValues(data));

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const filter = values.filter(data => data.path.toLowerCase().includes(eventAction))
    setFilterData(filter)
  },[values, eventAction])

  const handleChange = (event) => {
    const filter = values.filter(data => data.path.toLowerCase().includes(event.target.value))
    setEventAction(event.target.value);
    setFilterData(filter)
  };

  // const handleSendMessage = () => {
  //   const ws = new WebSocket('ws://localhost:8000');

  //   ws.addEventListener('open', () => {
  //     console.log('WebSocket connection opened');
  //     ws.send(message);
  //   });

  //   ws.addEventListener('message', (event) => {
  //     console.log('Received message:', event.data);
  //     ws.close();
  //   });
  // };

  return (
    <>
        <div className='search'>
          <input type="search" onChange={handleChange}/>
        </div>
        {
          filterData?.map((element, index) => {
              console.log(element)
              
              // let divElement = null;;
              // if (splitItem[2] === 'txt') {
              //   divElement = <div>text</div>;
              // } else {
              //   const voice = "E://Islam//temp//" + element;
              //   // divElement = <div>
              //   //                   <audio controls>
              //   //                       <source src={voice} type="audio/mpeg"/>
              //   //                     </audio>
              //   //               </div>
              // }
              
              return (
                <div key={index} id="card" className="card">       
                    <div className='info'>
                      ok
                        <div>{element.mobile}</div>
                        <div>{element.fileDate}</div>
                    </div>
                    {/* {divElement} */}
                </div>
              )  
            })
        }
    </>
  )
}

export default FilterSearch