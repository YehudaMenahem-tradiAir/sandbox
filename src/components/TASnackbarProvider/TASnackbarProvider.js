import React, { useState, useEffect, useRef } from 'react'

//components
import TASnackbar from './../TASnackbar'

//third-party
import PropTypes from 'prop-types'

//styles
import './TASnackbarProvider.css'

export default function TASnackbarProvider(props){
    const { id, variant, position, maxSnackbars, snackbarsList } = props
    const [list,setList] = useState([])
    
    useEffect(()=>{
        if(snackbarsList.length){
            setList(list => [snackbarsList[snackbarsList.length-1], ...list])
        }
    },[snackbarsList])

    const listArr = () =>{
        if(list.length > maxSnackbars){
            setList((list) => {
                let listCopy = Object.assign(list)
                listCopy.splice(-1,1)
                return listCopy
            })
        }
        return list
    }

    return (
        <div className={`snackbar-provider ${position}`}>
            {listArr().map((match) => (
                <TASnackbar 
                    key={`ta-snackbar-${match.id}`} 
                    id={`ta-snackbar-${match.id}`}
                    show={true} 
                    message={`${match.msg}`} 
                    variant={variant}
                    position={position}
                />
            ))}
        </div>
    )
}

TASnackbarProvider.propTypes = {
    id: PropTypes.string,
    snackbarsList: PropTypes.array, 
    maxSnackbars: PropTypes.number, 
}

TASnackbarProvider.defaultProps = {
    id: '',
    snackbarsList: [], 
    maxSnackbars: 5,
}