import React from 'react'

//snackbar
import { useSnackbar } from 'notistack';


export default function Snacks() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const snkTime = () =>{
        enqueueSnackbar(
            'Snack T!me bitches',
            { 
                variant: "success",
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
                persist: true,
                onEnter: beforeSnkTime
            }
        )
    }

    const beforeSnkTime = () =>{
        let browserTabTitle = document.title
        let msgTitleForBrowser = 'match'

        let blink = setInterval(() => {
            document.title = document.title === browserTabTitle ? msgTitleForBrowser : browserTabTitle
        },800)

        window.addEventListener("mousemove", function(){
            clearInterval(blink);
            document.title = browserTabTitle
        })

        window.removeEventListener("mousemove", function(){
            clearInterval(blink);
        })

    }

    const clsSnkTime = () =>{
        closeSnackbar();
    }


    return (
        <div>
            <p>Snacks t!me</p>
            <button onClick={snkTime}>let's eat something</button>
            <button onClick={clsSnkTime}>Close toaster</button>
        </div>
    )
}
