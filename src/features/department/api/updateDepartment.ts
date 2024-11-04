import { useMutation, useQueryClient } from "react-query";
import { axios } from "../../../libs/axios";
import { UpdateDepartment } from "../types";

export const updateDepartment = async (departmentId: string, data: UpdateDepartment): Promise<any> => {
  return axios.patch(`/department/${departmentId}`, data);
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({departmentId, data}: {departmentId: string, data: UpdateDepartment}) => 
      updateDepartment(departmentId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('department');
      },
    }
  );
};