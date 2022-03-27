import {baseApiUrl, sendRequestWithToken} from "./rootApi";

const absAdminApiUrl = `${baseApiUrl}/admin/api`;

export const getAllFiles = async () => {
    const url = `${absAdminApiUrl}/files`;

    return sendRequestWithToken(
        "GET",
        url
    );
};

export const fileUpload = async (request) => {
    const url = `${absAdminApiUrl}/files/upload`;

    return sendRequestWithToken(
        "POST",
        url,
        request
    );
};

export const fileProcess = async (request) => {
    const url = `${absAdminApiUrl}/files/process`;

    return sendRequestWithToken(
        "POST",
        url,
        request
    );
};