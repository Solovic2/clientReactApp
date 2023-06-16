import './App.css';
import React, { useEffect, useState } from 'react'
import FilterBox from './Components/FilterBox/FilterBox';
import FilterSearch from './Components/FilterSearch/FilterSearch';
import FilterCards from './Components/FilterCards/FilterCards';

function App() {
  const [values, setValues] = useState([])
  const [filterData, setFilterData] = useState([])
  const [eventAction, setEventAction] = useState()

  // Get Data From Database And Use WebSocket To Listen When File Added Or Deleted
  useEffect(() => {

    fetch("http://localhost:9000/")
    .then(res => res.json())
    .then(data => setValues(data));


    const ws = new WebSocket('ws://localhost:8000');

    ws.addEventListener('open', () => {
      console.log('WebSocket connection opened');
    });

    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'add') {
        setValues((prevValues) => [...prevValues, message.data]); // add the new data to the previous values
      } else if (message.type === 'delete') {
        
        setValues((prevValues) => prevValues.filter(data => data.id !== message.data.id));
      } else {
        console.warn('Received unknown message type:', message.type);
      }
    });

   

    return () => {
      ws.close();
    };
  }, []);

  // Filter Data When Values Changes Or Press Any Key In Search Bar
  useEffect(() => {
    const filter = values.filter(data => data.path.toLowerCase().includes(eventAction))
    setFilterData(filter)
  },[values, eventAction])

  // Handle The Change When Pressing Key In Search Bar To Filter Data
  const handleChange = (event) => {
    const filter = values.filter(data => data.path.toLowerCase().includes(event.target.value))
    setEventAction(event.target.value);
    setFilterData(filter)
  };

  return (
    <>
      <FilterBox>
        <FilterSearch handleChange = {handleChange}/>
        <FilterCards data = {filterData}/>
      </FilterBox>
    </>
  );
}
 
export default App;
