import { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { useDispatch } from "react-redux";

//redux
import { snackbarMatch } from './../actions'

//import css
import './PopupWindow.css' 


function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
        if (styleSheet.cssRules) {
          const newStyleEl = sourceDoc.createElement('style');
  
          Array.from(styleSheet.cssRules).forEach(cssRule => {
            newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
          });
  
          targetDoc.head.appendChild(newStyleEl);
        } else {
          const newLinkEl = sourceDoc.createElement('link');
  
          newLinkEl.rel = 'stylesheet';
          newLinkEl.href = styleSheet.href;
          targetDoc.head.appendChild(newLinkEl);
        }
    });
  }

const PopupWindow = props => {
  const {children , blinkTabAtMatch} = props
    const [containerEl] = useState(document.createElement("div"))
    let externalWindow = useRef(null)
    const dispatch = useDispatch()

  useEffect(
    () => {

        externalWindow.current = window.open(
            "",
            "_blank",
            `width=600, height=400, top=250`
        )

        copyStyles(document, externalWindow.current.document)
        externalWindow.current.document.title = 'React App'

        externalWindow.current.document.body.appendChild(containerEl)
        //   externalWindow.current.addEventListener("beforeunload", () => {
        //     props.closePopupWindowWithHooks();
        //   });

        return function cleanup() {
            externalWindow.current.close()
            externalWindow.current = null
        };
    },[containerEl])

    useEffect(()=>{

      const beforeSnkTime = (externalWin,externalWinDoc) =>{
        let browserTabTitle = externalWinDoc.title
        let msgTitleForBrowser = 'match'
        let blink = setInterval(() => {
            externalWinDoc.title = externalWinDoc.title === browserTabTitle ? msgTitleForBrowser : browserTabTitle
        },800)

        externalWin.addEventListener("mousemove", function(){
            clearInterval(blink)
            externalWinDoc.title = browserTabTitle
            dispatch(snackbarMatch(false))
        })

        externalWin.removeEventListener("mousemove", function(){
            clearInterval(blink)
        })

    }

        //match happened
        if(blinkTabAtMatch){
            beforeSnkTime(externalWindow.current, externalWindow.current.document)
        }
    },[blinkTabAtMatch, dispatch])

  return ReactDOM.createPortal(children, containerEl)

};

export default PopupWindow
