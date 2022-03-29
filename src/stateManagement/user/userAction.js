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

export const addCustomField = (payload) => ({
    type: ACTION.ADD_CUSTOM_FIELD,
    payload
});

export const getCustomFieldsByAuthUser = () => ({
    type: ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER
});

export const deleteCustomFieldsByAuthUser = (payload) => ({
    type: ACTION.DELETE_CUSTOM_FIELDS_BY_AUTH_USER,
    payload
});

export const filter = (payload) => ({
    type: ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER,
    payload
});