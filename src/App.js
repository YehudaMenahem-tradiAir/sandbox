import React,{ useState, useRef, useMemo, useCallback } from 'react'

//redux
import { useDispatch, useSelector } from 'react-redux'
import { 
  selectDragon, 
  snackbarMatch, 
  snackbarAdd,
  counterAdd,
  counterReduce,
  counterAddAsync
} from './actions'

import { 
  getSnackbarMatchState, 
  getSnackbarMatchesState, 
  getDragonSelectedState,
  getSnackbarLog,
  getCounterState
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
  const dragon = useSelector(getDragonSelectedState) //redux
  const isMatched = useSelector(getSnackbarMatchState) //redux
  const matches = useSelector(getSnackbarMatchesState) //redux
  const snackbarLog = useSelector(getSnackbarLog) //redux
  const counter = useSelector(getCounterState) //redux
  const dispatch = useDispatch() //redux
  const [ isPopupWindow,setIsPopupWindow ] = useState(false) //portal
  const { enqueueSnackbar } = useSnackbar() //toaster - thirdparty
  const audioElem = useRef() 
  const btn = useRef()
  const [ name,setName ] = useLocaleStorage('name','') //custom hook
  const [playMatchSound] = useSound(IcqSound) //useSound - thirdparty
  const [number, setNumber] = useState(1) 
  useLogger(number) //custom hook
  const [numberMemo, setNumberMemo] = useState(1) //useMemo
  const [dark, setDark] = useState(true) //useMemo
  const doubleSlowFunctionVal = useMemo(() => {
    return slowFunction(numberMemo) //useMemo
  },[numberMemo])

  console.log('%cSandbox-Project', 'font-family:arial;font-size:25px;color:green')

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



  //useMemo
  const themeStyles = {
    backgroundColor: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000'
  }

  //useMemo
  const changeTheme = () =>{
    console.log('theme change value')
    setDark(!dark)
  }

  return (
    <div className="App">
      <h1> <img className={`icon i-sandbox`} alt={`sandbox`} src={SandboxIcon} width="70px"></img> My Sandbox </h1>
      <div className={`sandbox`}>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>React-Saga middleware</h3>
            <div className="content closed mr-t-xl">
              <div>
                <Button 
                  label="Increment" 
                  styleBtn="solid" 
                  size="small" 
                  classes="mr-r-sm" 
                  click={()=>dispatch(counterAdd())}>
                </Button>
                <Button 
                  label="Decrement" 
                  styleBtn="solid" 
                  size="small" 
                  classes="mr-r-sm" 
                  click={()=>dispatch(counterReduce())}>
                </Button>
                <Button 
                  label="onIncrementAsync" 
                  styleBtn="ghost" 
                  size="small"  
                  click={()=>dispatch(counterAddAsync())}>
                </Button>
              </div>
              <div>Counter: {counter} </div>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>Storybook stories</h3>
            <div className="content closed mr-t-xl">
              <p>Begining of the btn story on <code>npm run storybook</code></p>
            </div>
          </div>

          <div className={`section`}>
            <h3 className={`mr-b-sm`} onClick={(e) => openSectionContent(e)}>useMemo Hook</h3>
            <div className="content closed mr-t-xl">
              <p>Theme style && slow function</p>
              <input type="number" value={numberMemo} onChange={(e) => setNumberMemo(e.currentTarget.value)} />
              <button onClick={changeTheme}>Change Theme</button> 
              <p style={themeStyles}>{doubleSlowFunctionVal}</p>
            </div>
          </div>

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

//useMemo
const slowFunction = (value) =>{
  console.log('slowFunction of input vield change')
  for (let index = 0; index < 1000000000; index++){}
  return value*2
}

export default App;
