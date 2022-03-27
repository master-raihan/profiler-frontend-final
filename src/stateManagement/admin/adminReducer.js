import * as ACTION from "./adminActionType";

const initialState = {
    isLoading: false,
    isLoggedIn: false,
    auth: {},
    users: [],
    response: {},
    error: {}
}

const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTION.ADMIN_LOGIN:
            return { ...state, isLoading: true };
        case ACTION.ADMIN_LOGIN_SUCCESS:
            return { ...state, isLoading: false, isLoggedIn: true, auth: action.payload };
        case ACTION.ADMIN_LOGIN_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        case ACTION.ADD_NEW_USER:
            return { ...state, isLoading: true };
        case ACTION.ADD_NEW_USER_SUCCESS:
            return { ...state, isLoading: false, users: [...state.users, action.payload.data.user ], response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.ADD_NEW_USER_FAILED:
            return { ...state, isLoading: false };
        case ACTION.GET_ALL_USERS:
            return { ...state, isLoading: true };
        case ACTION.GET_ALL_USERS_SUCCESS:
            return { ...state, isLoading: false, users: action.payload.data, response: { status: action.payload.status, success: action.payload.success, message: action.payload.message } };
        case ACTION.GET_ALL_USERS_FAILED:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
}

export default adminReducer;