import store from '../redux/store';
import { fileActions } from '../redux/actions/index';
import { getAllSavedFiles } from "../idbUtils/getAllSavedFiles/getAllSavedFiles";
const { storeMachineIDAndFiles, storeFile, moveFileToidbState } = fileActions;
export default {
    storeState: function(data){
        store.dispatch(storeMachineIDAndFiles(data))
    },
    addFile: function(data){
        store.dispatch(storeFile(data))
    },
    moveToidbState: async function(){
        const files = await getAllSavedFiles();
        store.dispatch(moveFileToidbState(files))
    },
}