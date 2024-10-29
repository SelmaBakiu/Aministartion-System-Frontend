import {axios} from "../../../libs/axios.ts";
import {Employee} from "../../employee/types";
import {useQuery} from "react-query";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";

type GetEmployeesParams = {
    page?: number,
    limit?: number,
    search?: string
}
//TODO: replace userId with real user id
export const getEmployees = (params: GetEmployeesParams): Promise<{
    data: Employee[],
    all: number,
    page: number,
}> => {
    return axios.get(`/user`, {params})
}

export const useGetEmployees = (params: GetEmployeesParams) => {
    return useQuery({
        queryKey: [QUERY_KEYS.employees, params],
        queryFn: () => getEmployees(params)
    })
}