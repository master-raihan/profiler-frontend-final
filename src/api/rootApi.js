import axios from "axios";

export const sendRequest = (method, url, payload = []) => {
    return axios.request({
        method,
        url,
        data: payload,
    });
};

export const sendRequestWithToken = (method, url, payload = []) => {
    // For Cancel Token
    let cancelToken;

    if (typeof cancelToken !== typeof undefined) {
        cancelToken.cancel("Canceling the previous token.");
    }

    cancelToken = axios.CancelToken.source();

    const bearerToken = localStorage.getItem("access_token");

    return axios.request({
        method,
        url,
        data: payload,
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
        cancelToken: cancelToken.token,
    });
};

export const baseApiUrl = "http://localhost:8000";
