import { useNavigate } from 'react-router-dom'
import './Profile.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
import api from '../helpers/axios.config';

const Profile = () => {

    const rout = useNavigate();
    const { state } = useContext(AuthContext)

    const [info, setInfo] = useState({})

    const getYourInformation = async () => {
        try {
            const response = await api.post("/auth/get-all-info", { id: state?.user.id })
            if (response.data.success) {

                console.log(response.data, 'info')
                setInfo(response.data.info)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data.message)
        }
    }

    useEffect(() => {
        if (state?.user?.id) {
            getYourInformation()
        }
    }, [state])

    return (
        <div className='profile-screen'>
            {/* <h1>Name : {state?.user?.name}</h1>
            <h1>Number : {info?.user?.number}</h1>
            <h1>Email : {info?.user?.email}</h1>
            <h1>Product cart : {info?.user?.cart?.length}</h1>
            <h1>Product Added : {info?.productAdded}</h1> */}
            <table className='table'>
                <tr>
                    <th>Name : </th>
                    <td>{state?.user?.name}</td>
                </tr>
                <tr>
                    <th>Number : </th>
                    <td>{info?.user?.number}</td>
                </tr>
                <tr>
                    <th>Email : </th>
                    <td>{info?.user?.email}</td>
                </tr>
                <tr>
                    <th>cart : </th>
                    <td>{info?.user?.cart?.length} products</td>
                </tr>
                <tr>
                    <th>Added : </th>
                    <td>{info?.productAdded} products</td>
                </tr>
            </table>
        </div>
    )
}

export default Profile