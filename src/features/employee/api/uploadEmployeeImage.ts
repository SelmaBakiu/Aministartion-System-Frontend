import { axios } from "../../../libs/axios.ts";
import { useMutation } from "react-query";
import { QUERY_KEYS } from "../../../config/queryKeys.ts";
import storage from "../../../utils/storage.ts";

export const uploadEmployeeImage = (file: FormData) => {
  return axios.post(`/user/upload-image/${storage.getUser().user.id}`, file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUploadEmployeeImage = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.employees, "image-upload"],
    mutationFn: uploadEmployeeImage,
    onSuccess: (response) => {
      console.log(
        "Image uploaded successfully!",
        response.data.profileImageUrl
      );
    },
    onError: (error: Error) => {
      console.error("Image upload failed", error.message);
    },
  });
};
