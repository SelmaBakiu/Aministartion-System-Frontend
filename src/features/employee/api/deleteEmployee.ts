import {useMutation} from "react-query";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";
import {queryClient} from "../../../libs/react-query.ts";
import {axios} from "../../../libs/axios.ts";


export const deleteEmployee = (id: string) => {
    return axios.delete(`/user`, {params: {id}})
}

export const useDeleteEmployee = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.employees],
        mutationFn: deleteEmployee,
        onSuccess: () => {
            console.log("Employee deleted successfully!")
            queryClient.invalidateQueries({queryKey: [QUERY_KEYS.employees]})
        },
        onError: (error:Error) => {
            console.log(error.message)
        }
    })
}