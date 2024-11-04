import { useMutation, useQueryClient } from "react-query";
import { axios } from "../../../libs/axios";

export const deleteDepartment = (departmentId: string): Promise<any> => {
  return axios.delete(`/department/${departmentId}`);
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation(deleteDepartment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["department"]);
    },
  });
};