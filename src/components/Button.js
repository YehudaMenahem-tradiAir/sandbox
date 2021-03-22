import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDragon } from './../actions';

const Button = () => {

    const dragon = useSelector((state) => state.selectedDragon);
    const dispatch = useDispatch();

    return (
        <button className={`btn`} onClick={(()=>dispatch(selectDragon(dragon === "Drogo" ? "Rhaegal" : "Drogo")))}>
            My Btn Comp shows the state.dragon, which is: {dragon}
        </button>
    )

}

export default Button;