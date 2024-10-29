import {UpdateEmployee} from "../../employee/types/index.ts";
import {axios} from "../../../libs/axios.ts";
import {useMutation} from "react-query";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";
import {queryClient} from "../../../libs/react-query.ts";
import storage from "../../../utils/storage.ts";

const userId = storage.getUser().user.id;
export const updateEmployee = (employee: UpdateEmployee) => {
    return axios.patch(`/user/${userId}`, employee)
}

export const useUpdateEmployee = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.employees],
        mutationFn: updateEmployee,
        onSuccess: () => {
            console.log("Employee updated successfully!")
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.employees]})
        },
        onError: (error:Error) => {
            console.log(error.message)
        }
    })
}