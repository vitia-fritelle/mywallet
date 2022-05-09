import { createContext } from "react";
import { UserContextType } from "./types";

const UserContext = createContext<UserContextType>({
    name:'',
    token:''
});

export default UserContext;