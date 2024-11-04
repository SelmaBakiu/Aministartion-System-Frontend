import { UpdateEmployee } from "../types/index.ts";
import { axios } from "../../../libs/axios.ts";
import { useMutation } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import { queryClient } from "../../../libs/react-query.ts";
import storage from "../../../utils/storage.ts";

export const updateProfile = (employee: UpdateEmployee) => {
  return axios.patch(`/user/${storage.getUser().user.id}`, employee);
};

export const useupdateProfile = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.employees],
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.employees] });
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });
};
