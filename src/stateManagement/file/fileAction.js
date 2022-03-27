import * as ACTION from "./fileActionType";

export const getAllFiles = () => ({
    type: ACTION.GET_ALL_FILES
})

export const fileUpload = (payload) => ({
   type: ACTION.FILE_UPLOAD,
   payload
});

export const fileProcess = (payload) => ({
    type: ACTION.FILE_PROCESS,
    payload
});