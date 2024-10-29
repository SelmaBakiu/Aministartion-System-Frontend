import {axios} from "../../../libs/axios.ts";
import {useMutation} from "react-query";
import {QUERY_KEYS} from "../../../config/queryKeys.ts";
import { InsertEmployee } from "../../admin/types";

export const insertEmployee = (employee: InsertEmployee) => {
    return axios.post("/user", employee)
}

export const useInsertEmployee = () => {
    return useMutation({
        mutationKey: [QUERY_KEYS.employees],
        mutationFn: insertEmployee,
        onSuccess: () => {
            console.log("Employee created successfully!")
            //todo: maybe add an Alert Element to show the success
        },
        onError: (error:Error) => {
            console.log(error.message)
        }
    })
}