import { useQuery } from "react-query";
import { axios } from "../../../libs/axios";
import { Department } from "../types";

export const getDepartment = (departmentId: string): Promise<Department> => {
  return axios.get(`/department/${departmentId}`);
};

export const useGetDepartment = (departmentId: string) => {
  return useQuery({
    queryKey: ["department"],
    queryFn: () => getDepartment(departmentId),
  });
};

export const getAllDepartment = (): Promise<Department[]> => {
  return axios.get(`/department`);
};

export const useGetAllDepartment = () => {
  return useQuery({
    queryKey: ["department"],
    queryFn: () => getAllDepartment(),
  });
};
