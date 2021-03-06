import * as ACTION from "./fileActionType";

const initialState = {
    isLoading: false,
    stagedFile: {},
    response: {},
    files: [],
    error: {}
}

const fileReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION.GET_ALL_FILES:
            return { ...state, isLoading: true };
        case ACTION.GET_ALL_FILES_SUCCESS:
            return { ...state, isLoading: false, files: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_ALL_FILES_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        case ACTION.FILE_UPLOAD:
            return { ...state, isLoading: true };
        case ACTION.FILE_UPLOAD_SUCCESS:
            return { ...state, isLoading: false, stagedFile: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.FILE_UPLOAD_FAILED:
            return { ...state, isLoading: false, error: action.payload, response: { status: action.payload.status, success: false, message: action.payload.message } };
        case ACTION.FILE_PROCESS:
            return { ...state, isLoading: true };
        case ACTION.FILE_PROCESS_SUCCESS:
            return { ...state, isLoading: false, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.FILE_PROCESS_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}

export default fileReducer;