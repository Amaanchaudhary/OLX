import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from "../helpers/axios.config";


const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", password: "" })

    const rout = useNavigate();
    console.log(userData)

    const HandleChange = (event) => {
        // console.log(event.target.value, "- value,", event.target.name, "- name")
        setUserData({ ...userData, [event.target.name]: event.target.value });
    }

    const sendDataToBackend = async (event) => {
        event.preventDefault();   
        if (userData.name && userData.email && userData.password) {
            if (userData.password.length >= 8) {
                try {
                    const response = await api.post("/auth/register", { userData });
                    // const response = {data: {success : true}}
                    if (response.data.success) {
                        toast.success("Register Successfull.")
                        setUserData({ name: "", email: "", password: "" })
                        rout("/")
                    } else {
                        throw new Error("Something went wrong")
                    }
                }
                catch (error) {
                    toast.error(error?.message)
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
                <h1>Register</h1>

                <label>Name</label><br />
                <input name='name' type="text" onChange={HandleChange} autoComplete="off" /><br />

                <label>Email</label><br />
                <input name='email' type="email" onChange={HandleChange} autoComplete="off" /><br />

                <label>Password</label><br />
                <input name='password' type="password" onChange={HandleChange} autoComplete="off" /><br /><br />    

                <input type="Submit"  value='Register' />
            </form>
        </div>
    )
}

export default Register