import React from 'react';
import moment from 'moment';

// clsx => utilities for conditionally applying css classes
// without clsx
// className = {value ? xyz : abc}
// with clsx
// className = {clsx("xyz",value ? abc:efg)}
import clsx from "clsx";

import { forwardRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ExampleCustomInput = forwardRef(({value, onClick},ref)=>(
  <button
  type='button'
  className={clsx("datepicker-btn", value? "date-input-value" : "date-input-placeholder")}
  onClick={onClick}
  ref={ref}
  >
    {value ? moment(value).format("DD MMM YYYY") : "Due Date" }
  </button>
))

const CustomDatePicker = ({name, date, onChange, isClearable = true}) => {
  return (
    <div className='input-field-datepicker'>
        <DatePicker
        name={name}
        selected={date}
        onChange={onChange}
        isClearable={isClearable}
        customInput={<ExampleCustomInput/>}        
        />
        
    </div>
  )
}

export default CustomDatePicker
