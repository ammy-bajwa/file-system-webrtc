import { fileActionTypes } from '../actionTypes/index';
const { ADD_MACHINE_ID_AND_FILES, ADD_FILE, MOVE_TO_IDB_STATE } = fileActionTypes;
export const fileActions = {
    storeMachineIDAndFiles: function(payload) {
        return {
            type: ADD_MACHINE_ID_AND_FILES,
            payload
        }
    },
    storeFile: function(payload) {
        return {
            type: ADD_FILE,
            payload
        }
    },
    moveFileToidbState: function(payload) {
        return {
            type: MOVE_TO_IDB_STATE,
            payload
        }
    },
}