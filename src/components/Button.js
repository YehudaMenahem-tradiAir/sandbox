import React from 'react';

//assets
import './button.css'

const Button = (props) => {

    const { 
        label, 
        styleBtn, 
        size, 
        click,
        loading, 
        classes, 
        id, 
        rounded, 
        shadow, 
        disabled, 
        children,
        index,
        scrollToTop,
        position,
        type,
     } = props

    //calling parent function
    const clickButton = (event) => {
        if(scrollToTop){
            scrollTop();
            return;
        }

        if(click){
            click(event);
        }
    }

    const scrollTop = () => {
        window.scroll({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }

    return (
        <button 
            key={props.key} 
            id={id} 
            type={type}
            index={index} 
            className={`button ${loading ? 'loading' : ''} ${styleBtn} ${size} ${rounded ? "rounded" : ""} ${shadow ? "shadow" : ""} ${classes}
                        ${scrollToTop && position ? position : ""}`} 
            onClick={(e)=>clickButton(e)} 
            disabled={disabled}
            >
            {children}
            {loading
                ? 
                <div className="loading-bg">
                    <div className="stage">
                        <div className="dot-pulse"></div>
                    </div>
                </div>
                :
                ""
            }
            <span className="label">{label}</span>
        </button>
    );
}

export default Button;
