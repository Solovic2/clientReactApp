import React, { useEffect, useState } from 'react'
import "./FilterSearch.css"
import { useNavigate } from 'react-router';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setMonthYear } from '../../Redux/userSlice';
const FilterSearch = (props) => {

  const [isToggled, setIsToggled] = useState(false);
  const [selectedYear, setSelectedYear] = useState(process.env.REACT_APP_DEFAULT_YEAR);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthsLoaded, setMonthsLoaded] = useState(false);
  const [monthSelector, setMonthSelector] = useState([]);
  const navigate = useNavigate()
  const { setValues, setFilterData} = props;
  const dispatch = useDispatch();

  useEffect(() => {
    getMonths(selectedYear);
    setMonthsLoaded(true)

  }, [selectedYear]);

  useEffect(() => {
    if (monthsLoaded && monthSelector && monthSelector[0]) {
      setSelectedMonth(monthSelector[0]);
    } else if (monthsLoaded && monthSelector.length === 0) {
      setSelectedMonth([]);
    }
  }, [monthsLoaded, monthSelector])

  useEffect(() => {
    if (selectedMonth.length > 0) {
      const yearMonthPath = selectedYear + "\\" + selectedMonth;
      const encodedPath = encodeURI(yearMonthPath);
      dispatch(setMonthYear(yearMonthPath))
      fetch("http://localhost:9000/" + encodedPath, {
        credentials: 'include'
      })
        .then(async response => {
          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('You are not authenticated');
            } else {
              throw new Error('Error fetching data');
            }
          }

          const data = await response.json();
          if (data) {
            setValues(data);
            setFilterData(data);
            setIsToggled(false);
          }

        })
        .catch(error => {
          console.error(error);
          navigate("/login");
        });
    }

  }, [selectedMonth, navigate]);

  const getMonths = (month) => {
    fetch(`http://localhost:9000/year-month-folders/${month}`, {
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
      .then(data => setMonthSelector(data))
      .catch(error => {
        // Display the error message
        console.error(error.message);
      })
  }
  const handleClick = useMemo(() => {
    return async (event) => {
      event.preventDefault();
      setIsToggled(!isToggled);
      if (!isToggled) {
        // execute function when button is toggled on
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        fetch(`http://localhost:9000/dateToday/${formattedDate}`, { credentials: 'include' })
          .then((response) => response.json())
          .then((data) => {
            setFilterData(data);
          });
      } else {
        const yearMonthPath = selectedYear + "\\" + selectedMonth;
        const encodedPath = encodeURI(yearMonthPath);
        fetch("http://localhost:9000/" + encodedPath, {
          credentials: 'include'
        })
          .then(async response => {
            if (!response.ok) {
              if (response.status === 401) {
                throw new Error('You are not authenticated');
              } else {
                throw new Error('Error fetching data');
              }
            }

            const data = await response.json();
            if (data) {
              setValues(data);
              setFilterData(data);
              setIsToggled(false);
            }
          })
          .catch(error => {
            console.error(error);
            navigate("/login");
          });
      }
    };
  }, [isToggled, selectedYear, selectedMonth]);

  const getMonthFolders = (event) => {
    setSelectedYear(event.target.value)

  }
  const getData = (event) => {
    setSelectedMonth(event.target.value);
  }

  return (
    <>
      <div className='searchBar'>
        <button className='btn btn-info toggleBtn' onClick={handleClick}>{isToggled ? "رجوع" : "شكاوي اليوم"}</button>
        <input className="search" type="search" placeholder="Search" onChange={props.handleChange} />
        <select className='selector' onChange={getMonthFolders}>

          {props.yearSelector.map(element => {

            return (
              <option
                key={`year-${element}`}
                value={element}
              >{element}</option>
            )

          })}
        </select>
        <select className='selector' onChange={getData}>

          {monthSelector?.map(element => {

            return (
              <option
                key={`month-${element}`}
                value={element}
              >{element}</option>
            )

          })}
        </select>
      </div>
    </>
  )
}

export default FilterSearch