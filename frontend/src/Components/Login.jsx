import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import api from "../helpers/axios.config";


function Login(){
    
    const [userData, setUserData] = useState({email: "", password: "" })

    const rout = useNavigate();
    console.log(userData)
    
    const {Login , state } = useContext(AuthContext)

    const HandleChange = (event) => {
        // console.log(event.target.value, "- value,", event.target.name, "- name")
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    const sendDataToBackend = async (event) => {
        event.preventDefault();   
        if (userData.email && userData.password) {
            if (userData.password.length >= 8) {
                try {
                    const response = await api.post("/auth/login", { userData });
                    if (response.data.success) {
                        localStorage.setItem("My-token" , JSON.stringify(response.data.token))
                        Login(response.data.user)
                        console.log(response.data, "- Response")
                        toast.success("Login Successfull.")
                        setUserData({email: "", password: "" })
                        rout("/")
                    } else {
                        throw new Error("Something went wrong")
                    }
                }
                catch (error) {
                    toast.error(error?.response?.data?.message)
                    console.log(error, "error-hai")
                }
            }
            else {
                toast.error("Password must be 8 digit")
            }
        }

        else {
            toast.error("All fields are mandatory!")
        }
    }

    return (
        <div>
            <form onSubmit={sendDataToBackend} autoComplete="off" >
                <h1>Login</h1>
                <label>Email</label><br />
                <input name='email' type="email" onChange={HandleChange} autoComplete="off" /><br />

                <label>Password</label><br />
                <input name='password' type="password" onChange={HandleChange} autoComplete="off" /><br /><br />

                <input type="Submit" value='Login' readOnly/>
                <button style={{marginLeft: "10px"}} onClick={() => rout('/register')}>Register?</button>
            </form>
        </div>
    )
}

export default Login