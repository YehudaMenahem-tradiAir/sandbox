import React,{ useEffect, useState } from 'react'

//third party
import PropTypes from 'prop-types'

//import css
import './TASnackbar.css' 


export default function TASnackbar(props) {
    const { classes, variant, position, message, id } = props
    const [closeAnimation, setCloseAnimation] = useState('')
    const [show,setShow] = useState(props.show)

    const closeToaster = () => {
        setCloseAnimation('close')
        // time for the closing animation to happen
        setTimeout(() => {
            setShow(false)
        }, 500)
    };

    const iconType = () =>{
        let icon;
        switch(variant){
            case 'success':
                icon = <i className='icon check circle'></i>
                break;
            case 'info':
                icon = <i className='icon info circle'></i>
                break;
            case 'error':
                icon = <i className='icon times circle'></i>
                break;
            case 'warning':
                icon = <i className='icon exclamation triangle'></i>
                break;

            default:
                icon = <i className='icon info circle'></i>
                break;
        }

        return icon;
    }

    if (show) {
        return (
            <div id={id} className={`toaster ${closeAnimation} ${variant} ${position} ${classes}`} 
            aria-describedby="snackbar-msg" role="alert">
                <i className={"icon close"} onClick={closeToaster}>X</i>
                <div className="icon-type mr-r-lr">
                    {/* changes by variant=type */}
                    <span>{iconType()}</span>
                </div>
                <div className="content">
                    <p id="snackbar-msg" className="message">{message}</p>
                </div>
            </div>
        )
    } else {
        return null;
    }

}

TASnackbar.propTypes = {
    classes: PropTypes.string,
    variant: PropTypes.string, 
    position: PropTypes.string, 
    message: PropTypes.string, 
    show: PropTypes.bool, 
    id:PropTypes.string,
}

TASnackbar.defaultProps = {
    classes:'',
    variant:'default', 
    position:'bottom-right', 
    message:'', 
    show:false, 
    id:'',
}
