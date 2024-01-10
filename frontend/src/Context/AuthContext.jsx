import { createContext, useEffect, useReducer } from "react";
import api from "../helpers/axios.config";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            localStorage.removeItem("My-token")
            toast.success("Logout Succesfull.")
            return { ...state, user: null }
        default:
            return state
    }
}

const ParentAuthContext = ({ children }) => {

    const initialState = { user: null }

    const [state, dispatch] = useReducer(reducer, initialState);

    const Login = (data) => {
        dispatch({ type: "LOGIN", payload: data })
    }
    const Logout = () => {
        dispatch({ type: "LOGOUT" })
    }

    useEffect(() => {
        // alert("page refreshed")
        async function getCurrentUser() {
            try {
                const response = await api.post("/auth/get-current-user", { token })
                if(response.data.success){
                    Login(response.data.user )
                }
            }catch(error){
                console.log(error)
            }
        }
        const token = JSON.parse(localStorage.getItem("My-token"))
        if (token) {
            getCurrentUser()
        }

    }, [])

    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default ParentAuthContext