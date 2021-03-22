import React,{ useState, useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

export default function Dragon() {

const [name,setName] = useState('Drogo')
const dragon = useSelector((state) => state.selectedDragon)
const fieldRef = useRef()
const prevName = useRef('')

useEffect(() => {
  prevName.current = name
},[name])

const focusField = () =>{
  fieldRef.current.focus()
}

  return (
    <>
      <p className={`mr-b-sm`}>
          This is a call from ... {dragon}
      </p>
      <input ref={fieldRef} className={`field mr-b-sm`} value={name} onChange={(e)=> setName(e.target.value)} type="text" />
      <p>the name is {name} but it used to be {prevName.current}</p>
      <button className={`btn`} onClick={focusField}>focus Div</button>
    </>
  )
}
