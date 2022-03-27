import * as ACTION from "./userActionType";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    auth: {},
    contacts: [],
    fields: [],
    response: {},
    error: false,
    errorMessage: ""
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION.USER_LOGIN:
            return { ...state, isLoading: true };
        case ACTION.USER_LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: false, isLoggedIn: true, auth: action.payload };
        case ACTION.USER_LOGIN_FAILED:
            return { ...state, isLoading: false, errorMessage: action.payload , error: true };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER:
            return { ...state, isLoading: true };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_SUCCESS:
            return { ...state, isLoading: false, error: false, contacts: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_FAILED:
            return { ...state, isLoading: false, error: true, errorMessage: action.payload };
        case ACTION.GET_FIELDS:
            return { ...state, isLoading: true };
        case ACTION.GET_FIELDS_SUCCESS:
            return { ...state, isLoading: false, error: false, fields: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_FIELDS_FAILED:
            return { ...state, isLoading: false, error: true, errorMessage: action.payload };
        default:
            return state;
    }
}

export default userReducer;