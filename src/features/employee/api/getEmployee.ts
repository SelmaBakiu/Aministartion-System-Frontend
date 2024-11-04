import { axios } from "../../../libs/axios.ts";
import { Employee } from "../types/index.ts";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import storage from "../../../utils/storage.ts";

export const getEmployee = (): Promise<Employee> => {
  return axios.get(`/user/${storage.getUser().user.id}`);
};

export const useGetEmployee = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getEmployee(),
  });
};
