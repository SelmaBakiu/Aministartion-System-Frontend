import Axios, {AxiosError, InternalAxiosRequestConfig} from "axios";
import storage from "../utils/storage.ts";
import {API_URL} from "../config";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const user = storage.getUser();
    //if token is expired -tokenExpiration is not implemented
    //todo: delete the checkAuth below if tokenExpiration is not implemented
    // if (!user.token || user.tokenExpiration < Date.now()) {
    //     //logout
    //     storage.clearUser();
    //     window.location.href = "/";
    //     return;
    // }

    if (user?.token) {
        config.headers["Authorization"] = "Bearer " + `${user.token}`;
    }
    return config;
}

export const axios = Axios.create({
    baseURL: API_URL,
});

export type ErrorDetails = {
    message: string;
    code: number;
};

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error: AxiosError<any>): Promise<ErrorDetails> => {
        const message = error.response?.data?.message || error.message;
        return Promise.reject({message, code: error.response?.status});
    }
);
