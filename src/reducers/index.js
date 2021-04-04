import { combineReducers } from 'redux'
import produce from 'immer'
import types from '../types/types'
import initialState from '../initials/initials'

const snackbarsReducer = (state = initialState,action) =>{

    switch (action.type){

        case types.MATCH_OCCUR: {
            const nextState = produce(state, (draftState) => {
                draftState.snackbarMatch = action.payload
                return draftState
            })
            return nextState
        }
        case types.ADD_SNACKBAR: {
            const nextState = produce(state, (draftState) => {
                draftState.snackbarMatches = [...draftState.snackbarMatches,action.payload]
                return draftState
            })
            return nextState
        }
        case types.SET_SNACK_LOG: {
            const nextState = produce(state, (draftState) =>{
                draftState.snackbarLog = action.payload
                return draftState
            })
            return nextState
        }
        case types.DRAGON_SELECT: {
            const nextState = produce(state, (draftState) => {
                draftState.selectedDragon = action.payload
                return draftState
            })
            return nextState
        }

        //redux-saga related
        case types.ADD_TO_COUNTER: {
            const nextState = produce(state, (draftState) => {
                draftState.counter++
                return draftState
            })
            return nextState
        }

        //redux-saga related
        case types.REDUCE_FROM_COUNTER: {
            const nextState = produce(state, (draftState) => {
                draftState.counter--
                return draftState
            })
            return nextState
        }

        default:
            return state
    }
}


export default combineReducers({
    snackbars: snackbarsReducer,
})