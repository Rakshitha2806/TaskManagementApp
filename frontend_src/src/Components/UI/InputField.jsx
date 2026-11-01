import React from 'react'
import CustomDatePicker from "./CustomDatePicker"

const InputField = ({name,label, type, inputImg, placeholder,className, value, onChange}) => {
  return (
    <div className={`input-field-container ${className || ""}`}>
        <p className='input-label'>{label}</p>
        <div className={type === "textarea" ? "input-wrapper textarea-wrapper" : "input-wrapper"} >

         <img src={inputImg} className="input-field-img" alt=''/>
         {type === "date" ? 
         (<CustomDatePicker date={value} name={name} onChange={onChange}/>)
         : type === "textarea"?(
            <textarea name={name} value={value} placeholder={placeholder} onChange={onChange} className='textarea-field-input' rows={3}/>
         ) :(
            <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className='input-field-input'/>
         )
        }
        </div>
    </div>
  )
}
export default InputField
