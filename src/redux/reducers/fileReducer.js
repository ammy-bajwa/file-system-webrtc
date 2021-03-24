import { fileActionTypes } from "../actionTypes/index";
const {
  ADD_MACHINE_ID_AND_FILES,
  ADD_FILE,
  MOVE_TO_IDB_STATE,
} = fileActionTypes;
const initState = {
  machineId: "",
  files: [],
  idbFiles: [],
};

export default function todos(state = initState, action) {
  switch (action.type) {
    case ADD_MACHINE_ID_AND_FILES:
      return {
        machineId: action.payload.machineId,
        idbFiles: action.payload.idbFiles,
        files: state.files,
      };
    case ADD_FILE:
      return {
        machineId: state.machineId,
        idbFiles: state.idbFiles,
        files: action.payload.files,
      };
    case MOVE_TO_IDB_STATE:
      return {
        machineId: state.machineId,
        idbFiles: action.payload.files,
        files: state.files.filter((file) => {
          return file.name !== action.payload.fileName;
        }),
      };
    default:
      return state;
  }
}
