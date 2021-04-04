import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import reducers from './reducers'
import rootSaga from './reducers/saga/saga'  

//third party modules
import { SnackbarProvider } from 'notistack'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// redux middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers, 
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware
    )
  ),
)

sagaMiddleware.run(rootSaga)

// redux middleware
store.subscribe(() => {
  console.log("store updated!",store.getState())
})

ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider maxSnack={5} >
        <App />
      </SnackbarProvider>
    </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
