import { axios } from "../../../libs/axios.ts";
import { useQuery } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import { Department } from "../types/index.ts";

export const getDepartment = (): Promise<Department> => {
  return axios.get(`departament`);
};

export const getRootDepartment = (): Promise<Department> => {
  return axios.get(`departament/parent`);
};

export const getDepartmentById = (id: number): Promise<Department> => {
  return axios.get(`departament/${id}`);
};
export const getDepartmentChildren = (id: number): Promise<Department> => {
  return axios.get(`departament/${id}/children`);
};

export const useGetDepartment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getDepartment(),
  });
};

export const useGetRootDepartment = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getRootDepartment(),
  });
};

export const useGetDepartmentById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getDepartmentById(id),
  });
};

export const useGetDepartmentChildren = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () => getDepartmentChildren(id),
  });
};
