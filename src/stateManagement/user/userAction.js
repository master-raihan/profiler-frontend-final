import * as ACTION from "./userActionType";

export const userLogin = (payload) => ({
    type: ACTION.USER_LOGIN,
    payload
});

export const getAllContactsByAuthUser = () => ({
    type: ACTION.GET_ALL_CONTACTS_BY_AUTH_USER
});