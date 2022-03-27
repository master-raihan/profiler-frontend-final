import { all, call, put, takeEvery } from "redux-saga/effects";
import * as ACTION from "./fileActionType";
import { fileUpload, fileProcess, getAllFiles } from "../../api/fileApi";


function* getAllFilesSaga(action) {
    try{
        const response = yield call(getAllFiles, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.GET_ALL_FILES_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.GET_ALL_FILES_FAILED, payload: error });
    }
}

function* fileUploadSaga(action) {
    try{
        const response = yield call(fileUpload, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.FILE_UPLOAD_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.FILE_UPLOAD_FAILED, payload: error });
    }
}

function* fileProcessSaga(action) {
    try{
        const response = yield call(fileProcess, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.FILE_PROCESS_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.FILE_PROCESS_FAILED, payload: error.message });
    }
}

function* fileWatcher() {
    yield takeEvery(ACTION.FILE_UPLOAD, fileUploadSaga);
    yield takeEvery(ACTION.FILE_PROCESS, fileProcessSaga);
    yield takeEvery(ACTION.GET_ALL_FILES, getAllFilesSaga);
}

export default function* fileSaga() {
    yield all([fileWatcher()])
}
