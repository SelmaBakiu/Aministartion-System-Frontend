import {useNavigate} from "react-router-dom";
import storage from "../utils/storage.ts";
import {queryClient} from "../libs/react-query.ts";

export const useLogout = () => {
    const navigate = useNavigate();
    return () => {
        storage.clearUser();
        queryClient.clear();
        navigate("/")
    };
}