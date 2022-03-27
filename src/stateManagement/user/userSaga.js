import { all, call, put, takeEvery } from "redux-saga/effects";
import * as ACTION from "./userActionType";
import { userLoginApi, getAllContactsByAuthUserApi, getFieldsApi } from "../../api/userApi";

function* userLoginSaga(action) {
    try{
        const response = yield call(userLoginApi, action.payload);
        if(response.data.success){
            localStorage.setItem("access_token", response.data.data.access_token);
            yield put({ type: ACTION.USER_LOGIN_SUCCESS, payload: response.data });
        }else {
            yield put({type: ACTION.USER_LOGIN_FAILED, payload: response.data});
        }
    }catch(error){
        yield put({type: ACTION.USER_LOGIN_FAILED, payload: error.message});
    }
}

function* getAllContactsByAuthUserSaga(action) {
    try{
        const response = yield call(getAllContactsByAuthUserApi, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_FAILED, payload: error.message});
    }
}

function* getFieldsSaga(action) {
    try{
        const response = yield call(getFieldsApi, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.GET_FIELDS_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.GET_FIELDS_FAILED, payload: error.message});
    }
}

function* userWatcher() {
    yield takeEvery(ACTION.USER_LOGIN, userLoginSaga);
    yield  takeEvery(ACTION.GET_ALL_CONTACTS_BY_AUTH_USER, getAllContactsByAuthUserSaga);
    yield  takeEvery(ACTION.GET_FIELDS, getFieldsSaga);
}

export default function* userSaga() {
    yield all([userWatcher()])
}
