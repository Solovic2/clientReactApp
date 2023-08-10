import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import FilterSearch from '../FilterSearch/FilterSearch';
import FilterCards from '../FilterCards/FilterCards';
import {useSelector } from 'react-redux';


const FilterBox = ({notify}) => {
  const {monthYear} = useSelector((state) => state.monthYear);
  const navigate = useNavigate()
  const [values, setValues] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [eventAction, setEventAction] = useState();
  const [yearSelector, setYearSelector] = useState([process.env.REACT_APP_DEFAULT_YEAR]);
  
    // Get Data From Database And Use WebSocket To Listen When File Added Or Deleted
    useEffect(() => {
      const ws = new WebSocket('ws://localhost:8000');
  
      ws.addEventListener('open', () => {
        console.log('WebSocket connection opened');
      });
  
      ws.addEventListener('message', (event) => {
      
        const message = JSON.parse(event.data);
        
        if (message.type === 'add') {
          if(message.month_year === monthYear){
            setFilterData((prevValues) => [...prevValues, message.data]); // add the new data to the previous values
            notify(1, prev => prev + 1)
          }
          
        } else if (message.type === 'delete') {
          if(message.month_year === monthYear){
            setFilterData((prevValues) => prevValues.filter(data => data.path !== message.data.path));
            notify(2, prev => prev - 1)
          }
        } else {
          console.warn('Received unknown message type:', message.type);
        }
      });
  
     
  
      return () => {
        ws.close();
      };
    }, [navigate, monthYear]);
    
    
  
  // Get Years Picker Folders
  useEffect(() => {
    fetch("http://localhost:9000/year-folders", {
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          // The response status is in the 2xx range, so the request was successful
          return response.json();
        } else if (response.status === 401) {
          // The user is not authenticated, display error message
          // throw new Error('You are not authenticated');
          throw new Error('You are not authenticated');
        } else {
          // The response status is not in the 2xx or 401 range, display error message
          throw new Error('An error occurred while fetching data');
        }
      })
      .then(data => setYearSelector(data))
      .catch(error => {
        // Display the error message
        console.error(error.message);
        navigate("/login");
      })

  }, [navigate])

  // Filter Data When Values Changes Or Press Any Key In Search Bar
  useEffect(() => {
    if (!eventAction) {
      setFilterData(values)
    } else {
      const filter = values.filter(data => data.path.toLowerCase().includes(eventAction))
      setFilterData(filter)
    }

  }, [values, eventAction])

  // Handle The Change When Pressing Key In Search Bar To Filter Data
  const handleChange = (event) => {
    const filter = values.filter(data => data.path.toLowerCase().includes(event.target.value))
    setEventAction(event.target.value);
    setFilterData(filter)
  };

  return (
    <>
      <div className="container">
        <FilterSearch yearSelector={yearSelector} handleChange={handleChange} setValues={setValues} setFilterData={setFilterData} />
        <FilterCards data={filterData} setFilterData={setFilterData} setValues={setValues} notify = {notify} />
      </div>
    </>
  )
}

export default FilterBox