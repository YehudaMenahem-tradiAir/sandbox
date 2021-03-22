import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux' //also add applyMiddleware if needed

import reducers from './reducers'

//third party modules
import { SnackbarProvider } from 'notistack'
// import logger from 'redux-logger'

import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// redux middleware
const store = createStore(
  reducers, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(logger)
)

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
