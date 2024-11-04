import { useMutation } from "react-query";
import { axios } from "../../../libs/axios";
import { UpdateDepartment } from "../types";
import { queryClient } from "../../../libs/react-query";

export const createDepartment = async (data: UpdateDepartment): Promise<any> => {
    return axios.post(`/department`, data);
};

export const useCreateDepartment = () => {
    return useMutation(createDepartment, {
        onSuccess: () => {
            queryClient.invalidateQueries('department');
        },
    });
};