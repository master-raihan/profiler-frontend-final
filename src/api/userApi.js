import {sendRequest, sendRequestWithToken, baseApiUrl} from "./rootApi";

const absUserApiUrl = `${baseApiUrl}/user/api`;

export const userLoginApi = async (request) => {
    const url = `${absUserApiUrl}/login`;

    return sendRequest(
        "POST",
        url,
        request
    );
};

export const getAllContactsByAuthUserApi = async () => {
    const url = `${absUserApiUrl}/contacts/get-by-auth-user`;

    return sendRequestWithToken(
        "GET",
        url
    );
};

export const getFieldsApi = async () => {
    const url = `${absUserApiUrl}/contacts/fields`;

    return sendRequestWithToken(
        "GET",
        url
    );
};