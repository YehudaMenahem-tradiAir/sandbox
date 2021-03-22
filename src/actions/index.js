import types from './types'

//chose deagon
export const selectDragon = payload =>{
    return {
        type: types.DRAGON_SELECT,
        payload
    }
}

// flag for new match 
export const snackbarMatch = payload => {
    return {
        type: types.MATCH_OCCUR,
        payload
    }
}

//add another snackbar
export const snackbarAdd = payload => {
    return {
        type: types.ADD_SNACKBAR,
        payload
    }
}

//log for createSelector test
export const snackbarLog = payload => {
    return {
        type: types.SET_SNACK_LOG,
        payload
    }
}