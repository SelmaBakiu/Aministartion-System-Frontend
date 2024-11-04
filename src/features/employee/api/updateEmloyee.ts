import { UpdateEmployee } from "../types/index.ts";
import { axios } from "../../../libs/axios.ts";
import { useMutation } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import { queryClient } from "../../../libs/react-query.ts";
export const updateEmployee = (employee: UpdateEmployee, id: string) => {
  return axios.patch(`/user/${id}`, employee);
};

export const useUpdateEmployee = (id: string) => {
  return useMutation({
    mutationKey: [QUERY_KEYS.employees],
    mutationFn: (employee: UpdateEmployee) => updateEmployee(employee, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employees] });
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });
};
