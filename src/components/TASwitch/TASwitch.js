import React,{ useState } from 'react';
import PropTypes from 'prop-types'
import './taSwitch.css'

const ToggleButton = (props) => {

    const { label, name, change, classes, id, isChecked, disabled, required, labelPosition } = props
    const [toggle, setToggle] = useState(isChecked);

    const handleChange = () => {
        setToggle(!toggle);
        if(change){
            let checked = !toggle;
            change(checked)
        }
    }
    
    return(
        <label 
            className={`toggle-button ${classes} ${labelPosition} ${toggle ? 'checked' : 'unchecked'}`}>
            <span className={`label`}>{label}</span>
            <span className="switch">
                <input 
                    type="checkbox" 
                    id={id}
                    name={name} 
                    defaultChecked={toggle} 
                    onChange={handleChange} 
                    required={required} 
                    disabled={disabled}/>
                <span className="circle-bg"></span>
                <span className="circle"></span>
            </span>
        </label>
    );

}

ToggleButton.propTypes = {
    label: PropTypes.string, 
    name: PropTypes.string, 
    change: PropTypes.func, 
    classes: PropTypes.string, 
    id: PropTypes.string, 
    isChecked: PropTypes.bool, 
    disabled: PropTypes.bool, 
    required: PropTypes.bool, 
    labelPosition: PropTypes.string,
}

ToggleButton.defaultProps = {
    isChecked: false, 
    disabled: false, 
    required: false, 
    labelPosition: 'label-from-left',
}

export default ToggleButton;


