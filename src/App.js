import React,{ useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDragon, snackbarMatch, snackbarAdd } from './actions'
import { 
  getSnackbarMatchState, 
  getSnackbarMatchesState, 
  getDragonSelectedState,
  getSnackbarLog
 } from './selectors'

//third party
import { useSnackbar } from 'notistack';
import useSound from 'use-sound'
import uuid from 'react-uuid'

//assets
import IcqSound from './assets/audio/icqSound.mp3'
import SandboxIcon from './assets/images/sandbox_icon.svg'

//hooks
import useLocaleStorage from './hooks/useLocaleStorage'
import useLogger from './hooks/useLogger'


import './App.css';

import Button from './components/Button'
import Dragon from './components/Dragon'
import PopupWindow from './components/PopupWindow'
import TASnackbar from './components/TASnackbar';

function App() {
  const dragon = useSelector(getDragonSelectedState)
  const isMatched = useSelector(getSnackbarMatchState)
  const matches = useSelector(getSnackbarMatchesState)
  const snackbarLog = useSelector(getSnackbarLog)
  const dispatch = useDispatch()
  const [ isPopupWindow,setIsPopupWindow ] = useState(false) 
  const { enqueueSnackbar } = useSnackbar()
  const audioElem = useRef()
  const btn = useRef()
  const [ name,setName ] = useLocaleStorage('name','')
  const [playMatchSound] = useSound(IcqSound)
  const [number, setNumber] = useState(1)
  useLogger(number)

  console.log('%cSandbox-Project', 'font-family:fantasy;font-size:25px;color:darkblue')

  const snkTime = () =>{
      enqueueSnackbar(
          'Snack T!me',
          { 
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              variant: "success",
              persist: true
          }
      )
      dispatch(snackbarAdd({msg:"Snack T!me", id:uuid()}))
      dispatch(snackbarMatch(true))
      // playAudio() from native js
      playMatchSound() //play audio from use-sound npm library
  }

  const openPopupWindow = () =>{
    setIsPopupWindow(true)
  }

  //audio sounds with html
  const playAudio = () =>{
    audioElem.current.play()
  }

  const setFieldName = (name) =>{
    setName(name)
  }

  // open section content 
  const openSectionContent = (e) =>{
    const currentSection = e.currentTarget.nextElementSibling // current element is the title h3 element 
    if(currentSection && currentSection.classList.contains('closed')){
      currentSection.classList.add('open') 
      currentSection.classList.remove('closed')
    } else if(currentSection && currentSection.classList.contains('open')){
      currentSection.classList.add('closed')
      currentSection.classList.remove('open')
    } else {
      return
    }
  }

  // useCallback
  const items = useCallback(() => {
    return [number, number*2, number*3]
  },[number])

  //button component click
  const chooseDragon = () =>{
    dispatch(selectDragon(dragon === "Drogo" ? "Rhaegal" : "Drogo"))
  }

  return (
    <div className="App">
      <h1> <img className={`icon i-sandbox`} alt={`sandbox`} src={SandboxIcon} width="70px"></img> My Sandbox </h1>
      <div className={`sandbox`}>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>useCallback Hook</h3>
            <div className="content closed mr-t-xl">
              <p>Not completed yet - still don't understand it completely.</p>
              <p>array of items</p>
              <input type="text" value={number} onChange={(e) => setNumber(e.currentTarget.value)} /> 
              <ul>
                {items().map((item) => {
                  return <li key={uuid()}>{item}</li>
                  })
                }
              </ul>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>PopupWindow Component </h3>
            <div className="content closed mr-t-xl">
              <button className={`btn mr-b-sm`} onClick={openPopupWindow}>pop the window out</button><br></br>
              <audio ref={audioElem} src={IcqSound} preload={"auto"}></audio>
              <button className={`btn mr-b-sm`} onClick={snkTime}>snaketime</button><br></br>
              <button className={`btn mr-b-sm`} ref={btn} onClick={playAudio}>Play ICQ "UO HO!!!" sound</button><br></br>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Custom Hooks</h3>
            <div className="content closed mr-t-xl">
              <label htmlFor="name" className={`mr-r-sm`}>What's my name?!:</label>
              <input 
                type="text"
                value={name}
                id="name"
                className="field"
                onChange={(e)=> setFieldName(e.target.value)}
              />
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Redux Middleware</h3>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Redux Action(dispatch)</h3>
            <div className="content closed mr-t-xl">
              <p>Dragon selected is {dragon}</p>
              <button className={`btn`} onClick={(()=>dispatch(selectDragon(dragon === "Drogo" ? "Rhaegal" : "Drogo")))}>Change dragon</button><br></br>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Redux createSelector:</h3>
            <div className="content closed mr-t-xl">
              <p>{snackbarLog}</p>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>button Component</h3>
            <div className="content closed mr-t-xl center">
              <Button 
                action={chooseDragon} 
                label="Btn Component" 
                styleBtn="solid" 
                size="medium" >
              </Button> 
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Dragon Component</h3>
            <div className="content closed mr-t-xl">
              <Dragon />
            </div>
          </div>

          <div>
            {isPopupWindow && (
                <PopupWindow blinkTabAtMatch={isMatched}>
                    <div className={`popup-window`}>
                      <h3>Here is the pop external window</h3>
                      <p>Here I want the snackbar every time the one from snacks opens</p>
                      <p>with or without test {dragon}</p>
                      <button className={`btn mr-b-sm`} onClick={(()=>dispatch(selectDragon(dragon === "Drogo" ? "Rhaegal" : "Drogo")))}>Change dragon</button><br></br>
                      <button className={`btn mr-b-sm`} onClick={playAudio}>UO HO!!!</button>
                      
                      {matches.map((match) => (
                        <TASnackbar 
                          key={`ta-snackbar-${match.id}`}
                          id={`ta-snackbar-${match.id}`}
                          show={true} 
                          message={match.msg} 
                          variant={'success'} 
                          position={'bottom-right'}
                        >
                        </TASnackbar>
                      ))}

                    </div>
                </PopupWindow>
            )}
          </div>

      </div>
    </div>
  );
}

export default App;
