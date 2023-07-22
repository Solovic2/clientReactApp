import './Home.css';
import React, { useEffect, useState } from 'react'
import FilterBox from '../../Components/FilterBox/FilterBox';
import FilterSearch from '../../Components/FilterSearch/FilterSearch';
import FilterCards from '../../Components/FilterCards/FilterCards';
import NotificationBar from '../../Components/NotificationBar/NotificationBar';

function Home() {
  const [values, setValues] = useState([])
  const [filterData, setFilterData] = useState([])
  const [eventAction, setEventAction] = useState()
  const [notifyAddDelete, setNotifyAddDelete] = useState(0)
  const [notifyCountFlag, setNotifyCountFlag] = useState(0)
  const [prevNotifyAddDelete, setPrevNotifyAddDelete] = useState(null);

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
        setFilterData((prevValues) => [...prevValues, message.data]); // add the new data to the previous values
        setNotifyAddDelete(1);
        setNotifyCountFlag(prev => prev + 1)
      } else if (message.type === 'delete') {
        setFilterData((prevValues) => prevValues.filter(data => data.id !== message.data.id));
        setNotifyAddDelete(2);
        setNotifyCountFlag(prev => prev - 1)
      } else {
        setNotifyCountFlag(0);
        console.warn('Received unknown message type:', message.type);
      }
    });

   

    return () => {
      ws.close();
    };
  }, []);

  // Notify when delete and added at same time 
  useEffect(() => {
    setPrevNotifyAddDelete(notifyAddDelete);
  }, [notifyAddDelete]);

  useEffect(() => {
    if (prevNotifyAddDelete === 1 && notifyAddDelete === 2) {
      setNotifyAddDelete(3);
      setNotifyCountFlag(prev => prev + 1)
      setPrevNotifyAddDelete(null);
    }
  }, [notifyAddDelete, prevNotifyAddDelete]);



  // Filter Data When Values Changes Or Press Any Key In Search Bar
  useEffect(() => {
    if(!eventAction){
      setFilterData(values)
    }else{
      const filter = values.filter(data => data.path.toLowerCase().includes(eventAction))
      setFilterData(filter)
    }
    
  },[values, eventAction])

  // Handle The Change When Pressing Key In Search Bar To Filter Data
  const handleChange = (event) => {
    const filter = values.filter(data => data.path.toLowerCase().includes(event.target.value))
    setEventAction(event.target.value);
    setFilterData(filter)
  };

  const setValuesData = (data) => {
    setValues(data);
  };

  const getValuesData = () => {
    return values;
  };

  const setFilteredData = (data) => {
    setFilterData(data);
  };
  
  return (
    <>
        <FilterBox>
            <NotificationBar flag = {notifyAddDelete} notifyFlag = {notifyCountFlag}/>
            <FilterSearch handleChange = {handleChange} getValuesData = {getValuesData} setFilteredData = {setFilteredData}/>
            <FilterCards data = {filterData} setValuesData = {setValuesData} setFilteredData = {setFilteredData}/>
        </FilterBox>
      
    </>
  );
}
 
export default Home;
