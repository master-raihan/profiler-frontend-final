import { sendRequest, sendRequestWithToken, baseApiUrl } from "./rootApi";

const absAdminApiUrl = `${baseApiUrl}/admin/api`;

export const adminLoginApi = async (request) => {
    const url = `${absAdminApiUrl}/login`;

    return sendRequest(
        "POST",
        url,
        request
    );
};

export const addNewUserApi = async (request) => {
    const url = `${absAdminApiUrl}/users/create`;

    return sendRequestWithToken(
        "POST",
        url,
        request
    );
};

export const getAllUsersApi = async () => {
    const url = `${absAdminApiUrl}/users`;

    return sendRequestWithToken(
        "GET",
        url
    );
};