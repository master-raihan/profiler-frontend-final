import { all, call, put, takeEvery } from "redux-saga/effects";
import * as ACTION from "./userActionType";
import {
    userLoginApi,
    getAllContactsByAuthUserApi,
    getFieldsApi,
    addCustomFieldApi,
    getCustomFieldsByAuthUserApi,
    filterApi
} from "../../api/userApi";

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

function* addCustomFieldSaga(action) {
    try{
        const response = yield call(addCustomFieldApi, action.payload);
        if(response.data.success){
            yield put({ type: ACTION.ADD_CUSTOM_FIELD_SUCCESS, payload: response.data });
        }
    }catch (error) {
        yield put({ type: ACTION.ADD_CUSTOM_FIELD_FAILED, payload: error.message});
    }
}

function* getCustomFieldsByAuthUserSaga(action) {
    try{
        const response = yield call(getCustomFieldsByAuthUserApi, action.payload);
        if(response.data.success){
            let data = {};
            response.data.data.map((val) =>{
                data = { ...data,  [val.field_name]: { ...data[val.field_name], [val.contact_id]: val.field_value }};
                return data;
            });
            yield put({ type: ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER_SUCCESS, payload: { data } });
        }
    }catch (error) {
        yield put({ type: ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER_FAILED, payload: error.message});
    }
}

function* filterSaga(action) {
    try{
        try{
            const response = yield call(filterApi, action.payload);
            if(response.data.success){
                yield put({ type: ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER_SUCCESS, payload: response.data });
            }
        }catch (error) {
            yield put({ type: ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER_FAILED, payload: error.message});
        }

    }catch (error) {
        console.log(error)
    }
}

function* userWatcher() {
    yield takeEvery(ACTION.USER_LOGIN, userLoginSaga);
    yield takeEvery(ACTION.GET_ALL_CONTACTS_BY_AUTH_USER, getAllContactsByAuthUserSaga);
    yield takeEvery(ACTION.GET_FIELDS, getFieldsSaga);
    yield takeEvery(ACTION.ADD_CUSTOM_FIELD, addCustomFieldSaga);
    yield takeEvery(ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER, getCustomFieldsByAuthUserSaga);
    yield takeEvery(ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER, filterSaga);
}

export default function* userSaga() {
    yield all([userWatcher()])
}
