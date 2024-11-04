import { axios } from "../../../libs/axios.ts";
import { useMutation } from "react-query";

export const forgetPassword = (email: string): Promise<void> => {
  return axios.post("/auth/forgot-password", { email });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: async () => {
      alert("An email has been sent to your email address");
    },
  });
};
