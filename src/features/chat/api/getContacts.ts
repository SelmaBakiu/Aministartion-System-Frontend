import {axios} from "../../../libs/axios.ts";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";

export const getAllContacts = (): Promise<{
    id: string,
    firstName: string,
    lastName: string,
}[]> => {
    return axios.get(`/user/chat`)
}

export const useGetAllContacts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.employees],
        queryFn: () => getAllContacts()
    })
}