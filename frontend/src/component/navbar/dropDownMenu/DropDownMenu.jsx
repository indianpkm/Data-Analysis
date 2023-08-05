import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './dropDown.css'
import { DataContext } from '../../../context/DataProvider';
import { dropDownOptions } from '../../../constrants/dropDownOption';

const DropDownMenu = ({open}) => {
  const { jsonData, setFilterData } = useContext(DataContext)
  const [dropDownData, setDropDownData] = useState([])

  const initialValue = {
    intensity: '',
    likelihood: '',
    relevance: '',
    start_year: '',
    end_year: '',
    country: '',
    region: '',
    topic: '',
    sector: ''
  }
  const [value, setValue] = useState(initialValue)

  let dropDownKeys = Object.keys(dropDownData);

  useEffect(() => {
    let filter = jsonData;
    dropDownKeys.forEach(key => {
      if (dropDownData[key]) {
        filter = filter.filter(d => d[key] === (dropDownData[key]))
      }
    })
    setFilterData(filter)
  }, [dropDownData, jsonData])

  const handleChange = (option, dropdownName) => {
    let val = option.value
    let ddn = dropdownName

    if (['intensity', 'likelihood', 'relevance', 'start_year', 'end_year'].includes(ddn))  {
      const numericValue = Number(val)
      setValue((preValue) => ({
        ...preValue,
        [ddn]: numericValue
      }))
    } else if (val.startsWith('Select')) {
      setValue((preValue) => ({
        ...preValue,
        [ddn]: ''
      }))
    } else {
      setValue((preValue) => ({
        ...preValue,
        [ddn]: val
      }))
    }
  }

  useEffect(() => {
    setDropDownData(value);
  }, [value]);

  const clearDropDown = () => {
    setValue(initialValue)
  }
  
const isPcView = window.innerWidth >= 1000;

  return (

    <div className='selector' style={{display:isPcView ? 'flex' : open ? 'block' : 'none'}} >
      {dropDownKeys.map((key, index) => (
        <Dropdown
          key={index}
          onChange={option => handleChange(option, key)}
          className='dropDown'
          options={dropDownOptions[key]} 
          placeholder={`Select ${key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}`}
        />
      ))}
      <button onClick={() => clearDropDown()} className='clear_btn'>Clear</button>
    </div>
  )
}

export default DropDownMenu;