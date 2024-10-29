import {useMutation, useQuery} from "react-query";
import {axios, ErrorDetails} from "../../../libs/axios.ts";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";
import {LoginCredentials, LoginResponse} from "../../../types/auth.types.ts";
import {useNavigate} from "react-router-dom";
import {queryClient} from "../../../libs/react-query.ts";
import storage from "../../../utils/storage.ts";

export const login = (credentials: LoginCredentials): Promise<LoginResponse> => {
    return axios.post('/auth/signin', credentials)
}

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            queryClient.setQueryData([QUERY_KEYS.authenticatedUser], data)
            storage.setUser(data)
            navigate('/')
        },
        onError: (error: ErrorDetails ) => {
            console.log(error.message)
            //todo: maybe add an Alert Element to show the error
        }
    })

}