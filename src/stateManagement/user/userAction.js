import * as ACTION from "./userActionType";

export const userLogin = (payload) => ({
    type: ACTION.USER_LOGIN,
    payload
});

export const getAllContactsByAuthUser = () => ({
    type: ACTION.GET_ALL_CONTACTS_BY_AUTH_USER
});

export const getFields = () => ({
    type: ACTION.GET_FIELDS
});