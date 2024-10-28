import {useQuery} from "react-query";
import {Employee} from "../types";
import AxiosInstance from "../../../libs/axios.ts";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";


export const useGetEmployees = () => {
    return useQuery<Employee[], Error>({
        queryKey: [QUERY_KEYS.employees],
        queryFn: async () => {
            const response = await AxiosInstance.get<Employee[]>('/employee')
            return response.data
        },
    })
}