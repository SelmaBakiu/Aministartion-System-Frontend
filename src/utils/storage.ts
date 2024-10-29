import {LoginResponse} from "../types/auth.types.ts";

const storagePrefix = "administration_system_";

const storage = {
    getUser: (): LoginResponse => {
        return JSON.parse(
            window.localStorage.getItem(`${storagePrefix}user`) as string
        ) as LoginResponse;
    },
    setUser: (user: LoginResponse) => {
        window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
    },
    clearUser: () => {
        window.localStorage.removeItem(`${storagePrefix}user`);
    }
};

export default storage;
