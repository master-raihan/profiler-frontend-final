import * as ACTION from "./userActionType";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    auth: {},
    contacts: [],
    response: {},
    error: {}
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION.USER_LOGIN:
            return { ...state, isLoading: true };
        case ACTION.USER_LOGIN_SUCCESS:
            return { ...state, isLoading: false, isLoggedIn: true, auth: action.payload };
        case ACTION.USER_LOGIN_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER:
            return { ...state, isLoading: true };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_SUCCESS:
            return { ...state, isLoading: false, contacts: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_ALL_CONTACTS_BY_AUTH_USER_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}

export default userReducer;