import { all } from "redux-saga/effects";
import adminSaga from "./admin/adminSaga";
import fileSaga from "./file/fileSaga";
import userSaga from "./user/userSaga";

export default function* rootSaga() {
    yield all([
        adminSaga(),
        fileSaga(),
        userSaga()
    ]);
};