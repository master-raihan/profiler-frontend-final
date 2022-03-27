import { all, call, put, takeEvery } from "redux-saga/effects";
import * as ACTION from "./adminActionType";
import { adminLoginApi, addNewUserApi, getAllUsersApi } from "../../api/adminApi";

function* adminLoginSaga(action) {
    try{
        const response = yield call(adminLoginApi, action.payload);
        if(response.data.success){
            localStorage.setItem("access_token", response.data.data.access_token);
            yield put({ type: ACTION.ADMIN_LOGIN_SUCCESS, payload: response.data });
        }else {
            yield put({type: ACTION.ADMIN_LOGIN_FAILED, payload: response.data});
        }
    }catch(error){
        yield put({type: ACTION.ADMIN_LOGIN_FAILED, payload: error.message});
    }
}

function* addNewUserSaga(action) {
    try {
        const response = yield call(addNewUserApi, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.ADD_NEW_USER_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.ADD_NEW_USER_FAILED, payload: error.message });
    }
}

function* getAllUsersSaga(action) {
    try {
        const response = yield call(getAllUsersApi, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.GET_ALL_USERS_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.GET_ALL_USERS_FAILED, payload: error.message });
    }
}


function* adminWatcher() {
    yield takeEvery(ACTION.ADMIN_LOGIN, adminLoginSaga);
    yield takeEvery(ACTION.ADD_NEW_USER, addNewUserSaga);
    yield takeEvery(ACTION.GET_ALL_USERS, getAllUsersSaga);
}

export default function* adminSaga() {
    yield all([adminWatcher()])
}
