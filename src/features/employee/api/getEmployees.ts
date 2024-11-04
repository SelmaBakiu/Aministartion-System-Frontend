import { axios } from "../../../libs/axios.ts";
import { Employee } from "../types/index.ts";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";

type GetEmployeesParams = {
  page?: number;
  limit?: number;
  firstName?: string;
  lastName?: string;
  departmentId?: string;
};

export const getEmployees = (
  params: GetEmployeesParams
): Promise<{
  data: Employee[];
  all: number;
  page: number;
}> => {
  return axios.get(`/user`, { params });
};

export const useGetEmployees = (params: GetEmployeesParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees, params],
    queryFn: () => getEmployees(params),
  });
};
