import { createSelector } from 'reselect'

export const getSnackbarsState = (state) => state.snackbars

export const getSnackbarMatchState = (state) => {
    return getSnackbarsState(state).snackbarMatch
}

export const getSnackbarMatchesState = (state) => {
    return getSnackbarsState(state).snackbarMatches
}

export const getSnackbarLog = createSelector(
    [getSnackbarMatchState,getSnackbarMatchesState],
    (snackbarMatch, snackbarMatches) => {
        return `snackbar match is: ${snackbarMatch.toString()} 
                and snackbarMatches is ${JSON.stringify(snackbarMatches)}`
    }
)

export const getDragonSelectedState = (state) => {
    return getSnackbarsState(state).selectedDragon
}