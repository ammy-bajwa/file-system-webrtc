import store from '../redux/store';
import { fileActions } from '../redux/actions/index';
import { getAllSavedFiles } from "../idbUtils/getAllSavedFiles/getAllSavedFiles";
const { storeMachineIDAndFiles, storeFile, moveFileToidbState, removeFileFromidbState, saveMetadataInState } = fileActions;
export default {
    storeState: function(data){
        store.dispatch(storeMachineIDAndFiles(data))
    },
    addFile: function(data){
        store.dispatch(storeFile(data))
    },
    moveToidbState: async function(fileName){
        const files = await getAllSavedFiles();
        store.dispatch(moveFileToidbState({fileName,files}))
    },
    removeFileFromidbFiles: function(fileName){
        store.dispatch(removeFileFromidbState({fileName}))
    },
    saveReceivedMetadataInState: function(data){
        store.dispatch(this.saveMetadataInState({data}))
    },
}