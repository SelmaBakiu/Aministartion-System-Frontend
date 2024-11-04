import { axios } from "../../../libs/axios.ts";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import { Employee } from "../../employee/types/index.ts";

export const getContacts = (): Promise<Employee[]> => {
  return axios.get(`/user/chat`);
};

export const useGetContacts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getContacts(),
  });
};
