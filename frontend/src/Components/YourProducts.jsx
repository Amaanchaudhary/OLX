import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import './YourProducts.css';
import api from "../helpers/axios.config";
import { AuthContext } from "../Context/AuthContext";

const YourProducts = () => {

    const rout = useNavigate();

    const { state } = useContext(AuthContext);

    const [YourProducts, setYourProducts] = useState([])

    async function getYourProducts() {
        try {
            const response = await api.post("/product/your-products", { id: state?.user?.id })
            if (response.data.success) {
                setYourProducts(response.data.products)
            }
        } catch (error) {
            toast.error(error?.response?.data.message)
        }
    }

    async function deleteProduct(id) {
        // alert(id)
        try {
            const response = await api.delete('product/delete-product', { params: { id } })
            if (response.data.success) {
                toast.success(response?.data.message)
                getYourProducts();
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data.message)
        }
    }

    useEffect(() => {
        if (state?.user && state?.user?.name !== undefined) {
            getYourProducts()
        }
    }, [state])

    useEffect(() => {
        const tokenn = JSON.parse(localStorage.getItem("My-token"))
        // console.log(tokenn , "tokken")
        if(!tokenn){
            rout("/login")
            toast.error("please login")
        }
    }, [])

    return (
        <div>
            {YourProducts.length ?
                <div className="yourproducts-Screen">{YourProducts.map((pro) => (
                    <div key={pro._id} className="yourproducts-product">
                        <img src={pro.image} alt="img" />
                        <h3 className="proName">Name : {pro.name}</h3>
                        <h3 className="proPrice">Price : {pro.price}</h3>
                        <button onClick={() => rout(`/updateproduct/${pro._id}`)}>Update ?</button>
                        <button onClick={() => deleteProduct(pro._id)}>Delete ?</button>
                    </div>

                ))}

                </div>
                :
                <div className="no-products">Loading...</div>
            }
        </div>
    )
}

export default YourProducts