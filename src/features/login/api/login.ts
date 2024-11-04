import { useState } from "react";
import { useMutation } from "react-query";
import { axios, ErrorDetails } from "../../../libs/axios.ts";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import { LoginCredentials, LoginResponse } from "../../../types/auth.types.ts";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../libs/react-query.ts";
import storage from "../../../utils/storage.ts";
export const login = (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  return axios.post("/auth/signin", credentials);
};

export const useLogin = () => {
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "error"
  );

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      queryClient.setQueryData([QUERY_KEYS.authenticatedUser], data);
      storage.setUser(data);
      setToastSeverity("success");
      setToastMessage("Login successful!");
      setToastOpen(true);
      navigate("/");
    },
    onError: (error: ErrorDetails) => {
      setToastSeverity("error");
      setToastMessage(error.message || "An error occurred");
      setToastOpen(true);
    },
  });
};
