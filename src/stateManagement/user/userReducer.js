import * as ACTION from "./userActionType";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    auth: {},
    contacts: [],
    fields: [],
    customFields: {},
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
        case ACTION.ADD_CUSTOM_FIELD:
            return { ...state, isLoading: true };
        case ACTION.ADD_CUSTOM_FIELD_SUCCESS:
            return { ...state, isLoading: false, error: false, customFields: { ...state.customFields,  [action.payload.data.field_name]: { ...state.customFields[action.payload.data.field_name], [action.payload.data.contact_id]: action.payload.data.field_value }}, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.ADD_CUSTOM_FIELD_FAILED:
            return { ...state, isLoading: false, error: true, errorMessage: action.payload, response: { status: action.payload.status, success: false, message: action.payload.message } };
        case ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER:
            return { ...state, isLoading: true };
        case ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER_SUCCESS:
            return { ...state, isLoading: false, error: false, customFields: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_CUSTOM_FIELDS_BY_AUTH_USER_FAILED:
            return { ...state, isLoading: false, error: true, errorMessage: action.payload };
        case ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER:
            return { ...state, isLoading: true };
        case ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER_SUCCESS:
            return { ...state, isLoading: false, error: false, contacts: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_ALL_FILTERED_CONTACTS_BY_AUTH_USER_FAILED:
            return { ...state, isLoading: false, error: true, errorMessage: action.payload };
        default:
            return state;
    }
}

export default userReducer;