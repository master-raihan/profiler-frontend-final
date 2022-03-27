import * as ACTION from "./adminActionType";

export const adminLogin = (payload) => ({
    type: ACTION.ADMIN_LOGIN,
    payload
});

export const addNewUser = (payload) => ({
    type: ACTION.ADD_NEW_USER,
    payload
});

export const getAllUsers = () => ({
    type: ACTION.GET_ALL_USERS
});