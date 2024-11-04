import { ResetPasswordRequest } from "../types";
import { useMutation } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys";
import storage from "../../../utils/storage";
import { axios } from "../../../libs/axios";

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await axios.post(
    `/user/reset-password/${storage.getUser().user.id}`,
    data
  );
  return response.data;
};

export const useRessetPassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.employees],
    mutationFn: resetPassword,
    onSuccess: () => {
      console.log("Password reset successfully!");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });
};
